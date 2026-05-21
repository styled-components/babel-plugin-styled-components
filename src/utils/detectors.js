import getSequenceExpressionValue from './getSequenceExpressionValue'
import { useTopLevelImportPathMatchers } from './options'

const VALID_TOP_LEVEL_IMPORT_PATH_MATCHERS = [
  'styled-components',
  'styled-components/no-tags',
  'styled-components/native',
  'styled-components/primitives',
].map(literal => x => x === literal)

export const isValidTopLevelImport = (x, state) => {
  return [
    ...VALID_TOP_LEVEL_IMPORT_PATH_MATCHERS,
    ...useTopLevelImportPathMatchers(state),
  ].some(isMatch => isMatch(x))
}

const IMPORT_NAMES_CACHE = 'styled-components-import-local-names'

export const importLocalName = (name, state, options = {}) => {
  const { bypassCache = false } = options

  if (state.customImportName) return state.customImportName.name

  let cache = state.file.get(IMPORT_NAMES_CACHE)
  if (!cache || bypassCache) {
    cache = {}
    state.file.set(IMPORT_NAMES_CACHE, cache)
  }

  if (!bypassCache && name in cache) return cache[name]

  let localName = state.styledRequired
    ? name === 'default'
      ? 'styled'
      : name
    : false

  state.file.path.traverse({
    ImportDeclaration: {
      exit(path) {
        const { node } = path
        if (!isValidTopLevelImport(node.source.value, state)) return

        for (const specifier of path.get('specifiers')) {
          if (
            specifier.isImportSpecifier() &&
            specifier.node.imported.name === 'styled'
          ) {
            localName = 'styled'
          }

          if (specifier.isImportDefaultSpecifier()) {
            localName = specifier.node.local.name
          }

          if (
            specifier.isImportSpecifier() &&
            specifier.node.imported.name === name
          ) {
            localName = specifier.node.local.name
          }

          // The namespace binding isn't directly callable, so prefer any
          // other specifier (default or named) discovered in this file.
          if (specifier.isImportNamespaceSpecifier() && !localName) {
            localName = name === 'default' ? specifier.node.local.name : name
          }
        }
      },
    },
  })

  cache[name] = localName
  return localName
}

// Follow `const X = Y` (and TS `const X = Y as Type`) chains so a local
// re-binding of the styled import still resolves to it. Lazy: only walks
// the chain when the direct-name check misses, so the hot path is unchanged.
const resolvesToDefaultLocal = (name, defaultLocal, state, t) => {
  if (!name || !defaultLocal) return false
  if (name === defaultLocal) return true
  const scope = state.file.path.scope
  const visited = new Set([name])
  let current = name
  while (true) {
    const binding = scope.getBinding(current)
    if (!binding || !binding.path.isVariableDeclarator()) return false
    const init = binding.path.node.init
    if (!init) return false
    let nextName = null
    if (t.isIdentifier(init)) {
      nextName = init.name
    } else if (
      (init.type === 'TSAsExpression' || init.type === 'TSTypeAssertion') &&
      t.isIdentifier(init.expression)
    ) {
      nextName = init.expression.name
    }
    if (!nextName) return false
    if (nextName === defaultLocal) return true
    if (visited.has(nextName)) return false
    visited.add(nextName)
    current = nextName
  }
}

export const isStyled = t => (tag, state) => {
  if (
    t.isCallExpression(tag) &&
    t.isMemberExpression(tag.callee) &&
    tag.callee.property.name !== 'default'
  ) {
    return isStyled(t)(tag.callee.object, state)
  } else if (
    t.isCallExpression(tag) &&
    t.isSequenceExpression(tag.callee) &&
    t.isMemberExpression(getSequenceExpressionValue(tag.callee)) &&
    getSequenceExpressionValue(tag.callee).property.name !== 'default'
  ) {
    return isStyled(t)(getSequenceExpressionValue(tag.callee), state)
  } else {
    const defaultLocal = importLocalName('default', state)
    const matchesDefault = name =>
      resolvesToDefaultLocal(name, defaultLocal, state, t)
    return (
      (t.isMemberExpression(tag) &&
        matchesDefault(tag.object.name) &&
        !isHelper(t)(tag.property, state)) ||
      (t.isCallExpression(tag) && matchesDefault(tag.callee.name)) ||
      (t.isCallExpression(tag) &&
        t.isSequenceExpression(tag.callee) &&
        matchesDefault(getSequenceExpressionValue(tag.callee).name)) ||
      // styled.default.div``, styled.default.something() — require() forms
      (state.styledRequired &&
        t.isMemberExpression(tag) &&
        t.isMemberExpression(tag.object) &&
        tag.object.property.name === 'default' &&
        tag.object.object.name === state.styledRequired) ||
      (state.styledRequired &&
        t.isCallExpression(tag) &&
        t.isMemberExpression(tag.callee) &&
        tag.callee.property.name === 'default' &&
        tag.callee.object.name === state.styledRequired) ||
      (state.styledRequired &&
        t.isCallExpression(tag) &&
        t.isSequenceExpression(tag.callee) &&
        t.isMemberExpression(getSequenceExpressionValue(tag.callee)) &&
        getSequenceExpressionValue(tag.callee).property.name === 'default' &&
        getSequenceExpressionValue(tag.callee).object.name ===
          state.styledRequired) ||
      (defaultLocal &&
        t.isMemberExpression(tag) &&
        t.isMemberExpression(tag.object) &&
        tag.object.property.name === 'default' &&
        tag.object.object.name === defaultLocal)
    )
  }
}

export const isCSSHelper = t => (tag, state) =>
  t.isIdentifier(tag) && tag.name === importLocalName('css', state)

export const isCreateGlobalStyleHelper = t => (tag, state) =>
  t.isIdentifier(tag) &&
  tag.name === importLocalName('createGlobalStyle', state)

export const isKeyframesHelper = t => (tag, state) =>
  t.isIdentifier(tag) && tag.name === importLocalName('keyframes', state)

export const isWithThemeHelper = t => (tag, state) =>
  t.isIdentifier(tag) && tag.name === importLocalName('withTheme', state)

export const isUseTheme = t => (tag, state) =>
  t.isIdentifier(tag) && tag.name === importLocalName('useTheme', state)

export const isHelper = t => (tag, state) =>
  isCreateGlobalStyleHelper(t)(tag, state) ||
  isCSSHelper(t)(tag, state) ||
  isUseTheme(t)(tag, state) ||
  isKeyframesHelper(t)(tag, state) ||
  isWithThemeHelper(t)(tag, state)

export const isPureHelper = t => (tag, state) =>
  isCreateGlobalStyleHelper(t)(tag, state) ||
  isCSSHelper(t)(tag, state) ||
  isKeyframesHelper(t)(tag, state) ||
  isUseTheme(t)(tag, state) ||
  isWithThemeHelper(t)(tag, state)

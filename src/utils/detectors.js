import getSequenceExpressionValue from './getSequenceExpressionValue'
import { useTopLevelImportPathMatchers } from './options'

const VALID_TOP_LEVEL_IMPORT_PATHS = new Set([
  'styled-components',
  'styled-components/no-tags',
  'styled-components/native',
  'styled-components/primitives',
])

export const isValidTopLevelImport = (x, state) =>
  VALID_TOP_LEVEL_IMPORT_PATHS.has(x) ||
  useTopLevelImportPathMatchers(state).some(isMatch => isMatch(x))

// `import type` and `import typeof` (declaration or specifier) bind no value
const isTypeOnly = node =>
  node.importKind === 'type' || node.importKind === 'typeof'

const IMPORT_NAMES_CACHE = 'styled-components-import-local-names'
const INJECTED_DEFAULT_NAME = 'styled-components-injected-default-name'

// The default binding the css-prop transform injected, which can be a
// `require` (script files) that no ImportDeclaration scan would find
export const injectedDefaultName = state =>
  state.file.get(INJECTED_DEFAULT_NAME)

export const registerInjectedDefault = (state, name) => {
  state.file.set(INJECTED_DEFAULT_NAME, name)
  state.file.set(IMPORT_NAMES_CACHE, null)
}

export const importLocalName = (name, state) => {
  if (state.customImportName) return state.customImportName.name

  let cache = state.file.get(IMPORT_NAMES_CACHE)
  if (!cache) {
    cache = {}
    state.file.set(IMPORT_NAMES_CACHE, cache)
  }

  if (name in cache) return cache[name]

  let localName = state.styledRequired
    ? name === 'default'
      ? state.styledRequired
      : name
    : false

  // Only top-level declarations are real bindings; imports inside TypeScript
  // and Flow `declare module` or `declare namespace` bodies are ambient
  for (const node of state.file.path.node.body) {
    if (node.type !== 'ImportDeclaration') continue
    if (isTypeOnly(node)) continue
    if (!isValidTopLevelImport(node.source.value, state)) continue

    for (const specifier of node.specifiers) {
      if (isTypeOnly(specifier)) continue

      if (
        name === 'default' &&
        specifier.type === 'ImportSpecifier' &&
        specifier.imported.name === 'styled'
      ) {
        localName = specifier.local.name
      }

      if (specifier.type === 'ImportDefaultSpecifier') {
        localName = specifier.local.name
      }

      if (
        specifier.type === 'ImportSpecifier' &&
        specifier.imported.name === name
      ) {
        localName = specifier.local.name
      }

      // The namespace binding isn't directly callable, so prefer any
      // other specifier (default or named) discovered in this file.
      if (specifier.type === 'ImportNamespaceSpecifier' && !localName) {
        localName = name === 'default' ? specifier.local.name : name
      }
    }
  }

  if (name === 'default') {
    const injected = injectedDefaultName(state)
    if (injected) localName = injected
  }

  cache[name] = localName
  return localName
}

const NAMESPACE_NAMES_CACHE = 'styled-components-import-namespace-names'
const NO_NAMESPACE_NAMES = []

// Local names bound by `import * as X from 'styled-components'`. Kept apart
// from `importLocalName('default')` so a default import injected later (the
// css-prop transform) does not displace the namespace binding.
const importNamespaceNames = state => {
  if (state.customImportName) return NO_NAMESPACE_NAMES

  let names = state.file.get(NAMESPACE_NAMES_CACHE)
  if (names) return names

  names = []
  for (const node of state.file.path.node.body) {
    if (node.type !== 'ImportDeclaration') continue
    if (isTypeOnly(node)) continue
    if (!isValidTopLevelImport(node.source.value, state)) continue

    for (const specifier of node.specifiers) {
      if (specifier.type === 'ImportNamespaceSpecifier') {
        names.push(specifier.local.name)
      }
    }
  }

  state.file.set(NAMESPACE_NAMES_CACHE, names)
  return names
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

// With only a styled `require` in the file, the default name is the required
// variable. A global `styled` (a bundler-provided identifier) keeps resolving
// as the default too.
const globalStyledAlias = (state, defaultLocal) =>
  state.styledRequired && defaultLocal === state.styledRequired
    ? 'styled'
    : null

// Named exports that are never styled tags. A required binding is the module
// object (v5, v6) or the callable `styled` with these attached (v7), so
// `sc.isStyledComponent(x)` must not be decorated. Helper names are included
// because isHelper only matches identifier keys, and `sc.default.css` /
// `sc['css']` are member expressions. Intrinsic tags (div, View, and the rest)
// are not in this set.
const NON_TAG_EXPORTS = new Set([
  'NativeStyleContext',
  'ParentContext',
  'SafeAreaInsetsProvider',
  'ServerStyleSheet',
  'StyleSheetConsumer',
  'StyleSheetContext',
  'StyleSheetManager',
  'ThemeConsumer',
  'ThemeContext',
  'ThemeProvider',
  '__PRIVATE__',
  '__testOnly_verticalAlignCompanions',
  'createGlobalStyle',
  'createTheme',
  'css',
  'extractCSS',
  'isStyledComponent',
  'keyframes',
  'matchMedia',
  'setAnimationDebug',
  'styled',
  'stylisPluginRSC',
  'toStyleSheet',
  'useBreakpoint',
  'useContainer',
  'useContainerQuery',
  'useMediaEnv',
  'useMediaQuery',
  'useNativeStyleContext',
  'useParentContext',
  'useTheme',
  'version',
  'withTheme',
])

// Static member key: `sc.div` and `sc['div']`. A computed non-literal has none.
const memberPropertyName = (t, property) => {
  if (t.isIdentifier(property)) return property.name
  if (t.isStringLiteral(property)) return property.value
  return null
}

// `ns.default`: the callable default export reached through a namespace
const isNamespaceDefault = (t, node, defaultLocal, state) =>
  t.isMemberExpression(node) &&
  node.property.name === 'default' &&
  (node.object.name === defaultLocal ||
    node.object.name === globalStyledAlias(state, defaultLocal) ||
    importNamespaceNames(state).includes(node.object.name))

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
    const alias = globalStyledAlias(state, defaultLocal)
    const matchesDefault = name =>
      resolvesToDefaultLocal(name, defaultLocal, state, t) ||
      resolvesToDefaultLocal(name, alias, state, t)
    return (
      (t.isMemberExpression(tag) &&
        tag.property.name !== 'default' &&
        !NON_TAG_EXPORTS.has(memberPropertyName(t, tag.property)) &&
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
        tag.object.object.name === state.styledRequired &&
        !NON_TAG_EXPORTS.has(memberPropertyName(t, tag.property))) ||
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
      (t.isMemberExpression(tag) &&
        isNamespaceDefault(t, tag.object, defaultLocal, state) &&
        !NON_TAG_EXPORTS.has(memberPropertyName(t, tag.property))) ||
      (t.isCallExpression(tag) &&
        isNamespaceDefault(t, tag.callee, defaultLocal, state)) ||
      (t.isCallExpression(tag) &&
        t.isSequenceExpression(tag.callee) &&
        isNamespaceDefault(
          t,
          getSequenceExpressionValue(tag.callee),
          defaultLocal,
          state
        ))
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

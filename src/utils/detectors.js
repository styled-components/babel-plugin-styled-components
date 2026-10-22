import { isStyledTag } from './domElements'
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
const REQUIRED_NAMES = 'styled-components-required-names'

// Names whose require() declarator assignStyledRequired has already walked.
// The css-prop pre-pass runs mid-traversal, and a require that sits below the
// first css prop must not be numbered there.
export const noteStyledRequired = (state, name) => {
  if (!name) return
  let names = state.file.get(REQUIRED_NAMES)
  if (!names) {
    names = new Set()
    state.file.set(REQUIRED_NAMES, names)
  }
  names.add(name)
}

const styledRequireVisited = (state, name) => {
  const names = state.file.get(REQUIRED_NAMES)
  return !!name && !!names && names.has(name)
}

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

// Members of `import styled` / `import { styled }` that are real functions
// without `.withConfig`. Unknown names stay decorated: on v7 that binding is
// a proxy, so `styled.notAnExport` is a tag factory. Require bindings,
// namespace imports, and every other local name use the tag allowlist instead,
// which does not need this set.
const OPEN_SKIP = new Set([
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf',
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

const INTEROP_REQUIRE = new Set(['_interopRequireDefault', '__importDefault'])

// `sc.div` / `sc['div']` have a static name. `sc[name]` is dynamic: the
// identifier is the variable, not the property, so its spelling is not a key.
const memberKey = (t, member) => {
  if (!t.isMemberExpression(member)) return null
  if (member.computed) {
    return t.isStringLiteral(member.property)
      ? { kind: 'static', name: member.property.value }
      : { kind: 'dynamic' }
  }
  return t.isIdentifier(member.property)
    ? { kind: 'static', name: member.property.name }
    : null
}

const unwrapType = node => {
  let current = node
  while (
    current &&
    (current.type === 'TSAsExpression' ||
      current.type === 'TSTypeAssertion' ||
      current.type === 'TSSatisfiesExpression')
  ) {
    current = current.expression
  }
  return current
}

const isStyledRequireCall = (t, node, state) => {
  if (!t.isCallExpression(node) || !t.isIdentifier(node.callee)) return false
  if (
    INTEROP_REQUIRE.has(node.callee.name) &&
    node.arguments &&
    node.arguments[0]
  ) {
    return isStyledRequireCall(t, node.arguments[0], state)
  }
  const arg = node.arguments && node.arguments[0]
  return (
    node.callee.name === 'require' &&
    !!arg &&
    t.isStringLiteral(arg) &&
    isValidTopLevelImport(arg.value, state)
  )
}

// Identifier bound with `require('styled-components')` or `.default` / `['default']`
// of that call (including the `_interopRequireDefault` / `__importDefault` wrap).
export const requireBindingName = (t, id, init, state) => {
  if (!t.isIdentifier(id)) return null
  let node = unwrapType(init)
  if (!node) return null
  const peeled = staticDefaultObject(t, node)
  if (peeled) node = peeled
  return isStyledRequireCall(t, node, state) ? id.name : null
}

// `.default` / `['default']`, or null when this member is not that key.
const staticDefaultObject = (t, node) => {
  if (!t.isMemberExpression(node)) return null
  const key = memberKey(t, node)
  if (!key || key.kind !== 'static' || key.name !== 'default') return null
  return node.object
}

const importedNameOf = (t, specifier) => {
  const imported = specifier.imported
  if (t.isIdentifier(imported)) return imported.name
  if (t.isStringLiteral(imported)) return imported.value
  return null
}

// 'open': default or named `styled` whose local name is `styled`. Any member
// except helpers, object methods, and known non-tag exports.
// 'allow': require() (and its `.default`), or an import with another local
// name. Intrinsic tags and styled() calls only.
// 'namespace': `import * as ns`. Same members as 'allow'. The call `ns(Comp)`
// is decorated too: a CommonJS transform binds `ns` to the module exports,
// which is the styled function. A native ESM namespace is not callable, so
// that call throws with or without `.withConfig`.
// null: this name is not a styled binding in `scope`.
const styledBindingKind = (name, scope, state, t, seen) => {
  if (!name || !scope) return null
  const token = `${scope.uid}:${name}`
  if (seen && seen.has(token)) return null

  const binding = scope.getBinding(name)
  if (!binding) {
    if (state.customImportName && name === state.customImportName.name) {
      return 'open'
    }
    // css-prop injects `var _styled = interop(require()).default` and then
    // calls it. That binding is not visible to scope.getBinding, so the name
    // registered for the injection is the styled function.
    if (injectedDefaultName(state) === name) return 'open'
    // A bundler global named `styled` next to a require() of the package.
    if (name === 'styled' && state.styledRequired) return 'open'
    return null
  }

  // A reassigned `let` / `var` is not the original module for its whole scope.
  if (binding.constant === false) return null

  const bpath = binding.path
  if (
    bpath.isImportDefaultSpecifier() ||
    bpath.isImportSpecifier() ||
    bpath.isImportNamespaceSpecifier()
  ) {
    const decl = bpath.parentPath
    if (!decl.isImportDeclaration()) return null
    if (isTypeOnly(decl.node) || isTypeOnly(bpath.node)) return null
    if (!isValidTopLevelImport(decl.node.source.value, state)) return null
    if (bpath.isImportNamespaceSpecifier()) return 'namespace'
    if (bpath.isImportSpecifier()) {
      const importedName = importedNameOf(t, bpath.node)
      if (importedName !== 'styled' && importedName !== 'default') return null
    }
    return bpath.node.local.name === 'styled' ? 'open' : 'allow'
  }

  if (!bpath.isVariableDeclarator() || !t.isIdentifier(bpath.node.id)) {
    return null
  }

  const init = unwrapType(bpath.node.init)
  if (!init) return null
  // Noted only once assignStyledRequired has walked the declarator, so a
  // require that sits below the first css prop is not numbered in that
  // pre-pass. `.default` / `['default']` of the call is the same binding.
  const peeled = staticDefaultObject(t, init)
  if (
    isStyledRequireCall(t, init, state) ||
    (peeled && isStyledRequireCall(t, peeled, state))
  ) {
    return styledRequireVisited(state, bpath.node.id.name) ? 'allow' : null
  }

  const chain = seen || new Set()
  chain.add(token)

  if (peeled) {
    // `const styled = sc.default` where `sc` is a require or a namespace.
    if (t.isIdentifier(peeled)) {
      const baseKind = styledBindingKind(
        peeled.name,
        binding.scope,
        state,
        t,
        chain
      )
      if (baseKind === 'allow' || baseKind === 'namespace') return 'allow'
    }
    return null
  }

  if (t.isIdentifier(init)) {
    return styledBindingKind(init.name, binding.scope, state, t, chain)
  }

  return null
}

const decorateKeyedMember = (kind, key, property, state, t) => {
  if (!kind || !key) return false
  if (key.kind === 'dynamic') return !isHelper(t)(property, state)
  if (key.kind !== 'static' || key.name === 'default') return false
  if (kind === 'open') {
    return !OPEN_SKIP.has(key.name) && !isHelper(t)(property, state)
  }
  return isStyledTag(key.name)
}

const isDefaultMember = (t, node) => {
  if (!t.isMemberExpression(node) || !t.isIdentifier(node.object)) return false
  const key = memberKey(t, node)
  return !!key && key.kind === 'static' && key.name === 'default'
}

export const isStyled = t => (tag, state, scope) => {
  const lookup =
    scope || (state.file && state.file.path && state.file.path.scope)

  if (t.isCallExpression(tag) && t.isMemberExpression(tag.callee)) {
    const key = memberKey(t, tag.callee)
    // `.attrs()` / `.withConfig()` chains. `['default']` is the styled
    // function, same as `.default`, so it is not peeled off here.
    if (!(key && key.kind === 'static' && key.name === 'default')) {
      return isStyled(t)(tag.callee.object, state, lookup)
    }
  } else if (
    t.isCallExpression(tag) &&
    t.isSequenceExpression(tag.callee) &&
    t.isMemberExpression(getSequenceExpressionValue(tag.callee))
  ) {
    const value = getSequenceExpressionValue(tag.callee)
    const key = memberKey(t, value)
    if (!(key && key.kind === 'static' && key.name === 'default')) {
      return isStyled(t)(value, state, lookup)
    }
  }

  if (t.isCallExpression(tag)) {
    const callee = t.isSequenceExpression(tag.callee)
      ? getSequenceExpressionValue(tag.callee)
      : tag.callee
    if (t.isIdentifier(callee)) {
      const kind = styledBindingKind(callee.name, lookup, state, t)
      return kind === 'open' || kind === 'allow' || kind === 'namespace'
    }
    if (isDefaultMember(t, callee)) {
      const kind = styledBindingKind(callee.object.name, lookup, state, t)
      return kind === 'open' || kind === 'allow' || kind === 'namespace'
    }
    return false
  }

  if (!t.isMemberExpression(tag)) return false

  if (isDefaultMember(t, tag.object) && t.isIdentifier(tag.object.object)) {
    const kind = styledBindingKind(tag.object.object.name, lookup, state, t)
    if (!kind) return false
    const outer = memberKey(t, tag)
    // `sc.default[name]` is a runtime lookup. The require path has always
    // decorated it, including when the variable is spelled like a helper.
    if (outer && outer.kind === 'dynamic') return true
    return decorateKeyedMember(kind, outer, tag.property, state, t)
  }

  if (!t.isIdentifier(tag.object)) return false
  const kind = styledBindingKind(tag.object.name, lookup, state, t)
  return decorateKeyedMember(kind, memberKey(t, tag), tag.property, state, t)
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

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

const LEGACY_DEFAULT_LOCAL = 'styled-components-legacy-default-local'

export const registerInjectedDefault = (state, name) => {
  state.file.set(INJECTED_DEFAULT_NAME, name)
  state.file.set(IMPORT_NAMES_CACHE, null)
  state.file.set(LEGACY_DEFAULT_LOCAL, null)
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

// Known non-tag exports. Object and function prototype names are not listed
// here; `isBuiltinPrototypeKey` covers them. None of those names are DOM or
// SVG tags (`name`, `length`, `caller`, and `arguments` included).
const OPEN_SKIP = new Set([
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

// A computed key whose value is known at compile time: a string, a template
// whose parts all fold to strings, or a const binding of one of those.
// `let`, `var`, destructuring, and imports do not fold.
const resolveStaticKey = (t, node, scope, seen) => {
  const current = unwrapType(node)
  if (!current) return null
  if (t.isStringLiteral(current)) return current.value
  if (t.isTemplateLiteral(current)) {
    const quasis = current.quasis || []
    const expressions = current.expressions || []
    let out = ''
    for (let i = 0; i < quasis.length; i++) {
      const cooked = quasis[i] && quasis[i].value.cooked
      if (cooked == null) return null
      out += cooked
      if (i >= expressions.length) continue
      const part = resolveStaticKey(t, expressions[i], scope, seen)
      if (part == null) return null
      out += part
    }
    return out
  }
  if (!t.isIdentifier(current) || !scope) return null
  const binding = scope.getBinding(current.name)
  if (
    !binding ||
    binding.kind !== 'const' ||
    !binding.path.isVariableDeclarator()
  ) {
    return null
  }
  if (seen && seen.has(binding)) return null
  const next = seen || new Set()
  next.add(binding)
  const resolved = resolveStaticKey(
    t,
    binding.path.node.init,
    binding.scope,
    next
  )
  next.delete(binding)
  return resolved
}

// `sc.div` / `sc['div']` / `sc[\`div\`]` / `const tag = 'div'; sc[tag]` have a
// static name. Anything else is a dynamic lookup. The identifier's spelling
// is not a key.
const memberKey = (t, member, scope) => {
  if (!t.isMemberExpression(member)) return null
  if (member.computed) {
    const resolved = resolveStaticKey(t, member.property, scope)
    return resolved == null
      ? { kind: 'dynamic' }
      : { kind: 'static', name: resolved }
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
const staticDefaultObject = (t, node, scope) => {
  if (!t.isMemberExpression(node)) return null
  const key = memberKey(t, node, scope)
  if (!key || key.kind !== 'static' || key.name !== 'default') return null
  return node.object
}

const referencePathFor = (binding, referenceNode) => {
  const paths = binding.referencePaths
  if (!paths || !referenceNode) return null
  for (let i = 0; i < paths.length; i++) {
    if (paths[i].node === referenceNode) return paths[i]
  }
  return null
}

const isLoopPath = path =>
  path.isForStatement() ||
  path.isWhileStatement() ||
  path.isDoWhileStatement() ||
  path.isForInStatement() ||
  path.isForOfStatement()

// A function nested inside the binding's scope can run after a reassignment
// even when the function is written above it.
const inNestedFunction = (binding, refPath) => {
  let scope = refPath.scope
  while (scope && scope !== binding.scope) {
    if (scope.path && scope.path.isFunction()) return true
    scope = scope.parent
  }
  return false
}

// A loop that both reads the binding and assigns it runs the read again
// after the assignment. A read in a loop whose assignment is outside the
// loop still sees the factory on every iteration.
const loopReassigns = (binding, refPath) => {
  const stop = binding.scope && binding.scope.path
  const violations = binding.constantViolations || []
  let path = refPath.parentPath
  while (path && path !== stop) {
    if (isLoopPath(path)) {
      for (let i = 0; i < violations.length; i++) {
        const violation = violations[i]
        if (violation === path || path.isAncestor(violation)) return true
      }
    }
    path = path.parentPath
  }
  return false
}

const assignmentPrecedes = (binding, referenceNode) => {
  if (!referenceNode || typeof referenceNode.start !== 'number') return true
  return binding.constantViolations.some(violation => {
    const start = violation.node && violation.node.start
    return typeof start === 'number' && start < referenceNode.start
  })
}

// True when this reference must not be treated as the factory. Straight-line
// uses in the binding's scope that sit before the assignment stay decorated.
const reassignmentUnsafe = (binding, referenceNode) => {
  if (!binding || binding.constant !== false) return false
  const refPath = referencePathFor(binding, referenceNode)
  if (refPath) {
    if (inNestedFunction(binding, refPath)) return true
    if (loopReassigns(binding, refPath)) return true
  }
  return assignmentPrecedes(binding, referenceNode)
}

const importedNameOf = (t, specifier) => {
  const imported = specifier.imported
  if (t.isIdentifier(imported)) return imported.name
  if (t.isStringLiteral(imported)) return imported.value
  return null
}

// 'open': the styled factory. Unknown members are decorated. Object methods
// and known non-tag exports are not. This is require(), a default import, a
// named `styled` import (any local name), `.default` of those, and the
// `_interopRequireDefault` / `__importDefault` helper.
// 'namespace': `import * as ns`. Same members as 'open': a CommonJS transform
// binds `ns` to the module exports, which is the factory on these packages.
// The call `ns(Comp)` is decorated too. A native ESM namespace is not
// callable, so that call throws with or without `.withConfig`.
// null: this name is not a styled binding at `referenceNode`.
const styledBindingKind = (name, scope, state, t, seen, referenceNode) => {
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

  if (reassignmentUnsafe(binding, referenceNode)) return null

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
    return 'open'
  }

  if (!bpath.isVariableDeclarator() || !t.isIdentifier(bpath.node.id)) {
    return null
  }

  const init = unwrapType(bpath.node.init)
  if (!init) return null
  // Noted only once assignStyledRequired has walked the declarator, so a
  // require that sits below the first css prop is not numbered in that
  // pre-pass. `.default` / `['default']` of the call is the same binding.
  const peeled = staticDefaultObject(t, init, binding.scope)
  if (
    isStyledRequireCall(t, init, state) ||
    (peeled && isStyledRequireCall(t, peeled, state))
  ) {
    return styledRequireVisited(state, bpath.node.id.name) ? 'open' : null
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
        chain,
        peeled
      )
      if (baseKind === 'open' || baseKind === 'namespace') return 'open'
    }
    return null
  }

  if (t.isIdentifier(init)) {
    return styledBindingKind(init.name, binding.scope, state, t, chain, init)
  }

  return null
}

// `in` is safe here: these prototypes are ordinary objects, and the check
// does not read the property. A name that is also a real tag would be kept,
// but no DOM or SVG tag is on either prototype.
const isBuiltinPrototypeKey = name =>
  name in Object.prototype || name in Function.prototype

// 2.3.0's default local: the string `'styled'` whenever a require() of the
// package exists, then overwritten by top-level imports. A named `styled`
// import sets the string `'styled'`, not the local alias. A default import
// sets that import's local name. A namespace sets its local name only when
// nothing else did.
const legacyDefaultLocal = (state, t) => {
  if (state.customImportName) return state.customImportName.name

  const hadRequired = !!state.styledRequired
  const cached = state.file.get(LEGACY_DEFAULT_LOCAL)
  if (cached && cached.hadRequired === hadRequired) return cached.value

  let localName = hadRequired ? 'styled' : null
  const body =
    state.file.path && state.file.path.node && state.file.path.node.body
  if (body) {
    for (const node of body) {
      if (node.type !== 'ImportDeclaration') continue
      if (isTypeOnly(node)) continue
      if (!isValidTopLevelImport(node.source.value, state)) continue
      for (const specifier of node.specifiers) {
        if (isTypeOnly(specifier)) continue
        const imported = specifier.imported
        const importedName = !imported
          ? null
          : t.isIdentifier(imported)
            ? imported.name
            : t.isStringLiteral(imported)
              ? imported.value
              : null
        if (specifier.type === 'ImportSpecifier' && importedName === 'styled') {
          localName = 'styled'
        }
        if (specifier.type === 'ImportDefaultSpecifier') {
          localName = specifier.local.name
        }
        if (
          specifier.type === 'ImportSpecifier' &&
          importedName === 'default'
        ) {
          localName = specifier.local.name
        }
        if (specifier.type === 'ImportNamespaceSpecifier' && !localName) {
          localName = specifier.local.name
        }
      }
    }
  }

  state.file.set(LEGACY_DEFAULT_LOCAL, { hadRequired, value: localName })
  return localName
}

const resolvesToDefaultLocal = (name, defaultLocal, state, t) => {
  if (!name || !defaultLocal) return false
  if (name === defaultLocal) return true
  const scope = state.file && state.file.path && state.file.path.scope
  if (!scope) return false
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

const legacyDecoratesUnresolved = (objectName, state, t) =>
  resolvesToDefaultLocal(objectName, legacyDefaultLocal(state, t), state, t)

const decorateKeyedMember = (kind, key, property, state, t, objectName) => {
  if (!kind || !key) return false
  // An unresolved key is decorated only for the names 2.3.0 decorated
  // (`styled[dynamic]`, a default import's local name). A require named
  // something else, and an alias that is not that name, stay plain.
  if (key.kind === 'dynamic') {
    if (!legacyDecoratesUnresolved(objectName, state, t)) return false
    return !isHelper(t)(property, state)
  }
  if (key.kind !== 'static' || key.name === 'default') return false
  if (isBuiltinPrototypeKey(key.name)) return false
  if (kind === 'open' || kind === 'namespace') return !OPEN_SKIP.has(key.name)
  return false
}

const isDefaultMember = (t, node, scope) => {
  if (!t.isMemberExpression(node) || !t.isIdentifier(node.object)) return false
  const key = memberKey(t, node, scope)
  return !!key && key.kind === 'static' && key.name === 'default'
}

export const isStyled = t => (tag, state, scope) => {
  const lookup =
    scope || (state.file && state.file.path && state.file.path.scope)

  if (t.isCallExpression(tag) && t.isMemberExpression(tag.callee)) {
    const key = memberKey(t, tag.callee, lookup)
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
    const key = memberKey(t, value, lookup)
    if (!(key && key.kind === 'static' && key.name === 'default')) {
      return isStyled(t)(value, state, lookup)
    }
  }

  if (t.isCallExpression(tag)) {
    const callee = t.isSequenceExpression(tag.callee)
      ? getSequenceExpressionValue(tag.callee)
      : tag.callee
    if (t.isIdentifier(callee)) {
      const kind = styledBindingKind(
        callee.name,
        lookup,
        state,
        t,
        null,
        callee
      )
      return kind === 'open' || kind === 'namespace'
    }
    if (isDefaultMember(t, callee, lookup)) {
      const kind = styledBindingKind(
        callee.object.name,
        lookup,
        state,
        t,
        null,
        callee.object
      )
      return kind === 'open' || kind === 'namespace'
    }
    return false
  }

  if (!t.isMemberExpression(tag)) return false

  if (
    isDefaultMember(t, tag.object, lookup) &&
    t.isIdentifier(tag.object.object)
  ) {
    const kind = styledBindingKind(
      tag.object.object.name,
      lookup,
      state,
      t,
      null,
      tag.object.object
    )
    if (!kind) return false
    const outer = memberKey(t, tag, lookup)
    // `.default` is the factory, so its members use the open skip set.
    // An unresolved computed key stays decorated, including when the
    // variable is spelled like a helper.
    if (outer && outer.kind === 'dynamic') return true
    return decorateKeyedMember(
      'open',
      outer,
      tag.property,
      state,
      t,
      tag.object.object.name
    )
  }

  if (!t.isIdentifier(tag.object)) return false
  const kind = styledBindingKind(
    tag.object.name,
    lookup,
    state,
    t,
    null,
    tag.object
  )
  return decorateKeyedMember(
    kind,
    memberKey(t, tag, lookup),
    tag.property,
    state,
    t,
    tag.object.name
  )
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

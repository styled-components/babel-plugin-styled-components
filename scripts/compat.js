// Compiles a handful of styled-components programs with the working tree and a
// base ref, then runs renderToString + ServerStyleSheet on styled-components
// v5, v6, and the latest v7 prerelease. Dev-only: those packages install into
// a temp cache, not this repo. Run with `node scripts/compat.js`.
const fs = require('fs')
const os = require('os')
const path = require('path')
const { spawnSync } = require('child_process')
const { parseArgs } = require('util')
const babel = require('@babel/core')
const presetEnvModule = require('@babel/preset-env')
const { buildRef, buildWorkingTree } = require('./bench/build-ref')
const { ROOT, withWorkDir } = require('./bench/shared')

const presetEnv = presetEnvModule.default || presetEnvModule
const VIRTUAL_FILE = path.join(ROOT, 'compat-src', 'code.js')
const CACHE = path.join(os.tmpdir(), 'bpsc-styled-compat')
// v5 accepts React 18, and React 17 has no ESM entry Node can load for react-dom/server.
const REACT = { 5: '18.3.1', 6: '18.3.1' }

const CASES = [
  {
    name: 'cjs require, default tag and helpers',
    sourceType: 'script',
    majors: [5, 6, 7],
    plain: ['isStyledComponent.withConfig', 'createTheme.withConfig', 'extractCSS.withConfig'],
    code: `
const sc = require('styled-components')
const { isStyledComponent } = sc
const Comp = sc.default.div\`color: red;\`
exports.Comp = Comp
exports.check = () => {
  if (sc.isStyledComponent(Comp) !== true) throw new Error('member helper rejected the tag')
  if (isStyledComponent(Comp) !== true) throw new Error('destructured helper rejected the tag')
  if (typeof sc.createTheme === 'function') sc.createTheme({ color: 'red' })
  if (typeof sc.extractCSS === 'function') sc.extractCSS()
}
`,
  },
  {
    name: 'cjs require, direct tag',
    sourceType: 'script',
    majors: [7],
    plain: ['isStyledComponent.withConfig'],
    code: `
const sc = require('styled-components')
const Comp = sc.div\`color: red;\`
exports.Comp = Comp
exports.check = () => {
  if (sc.isStyledComponent(Comp) !== true) throw new Error('member helper rejected the tag')
}
`,
  },
  {
    name: 'cjs require bound as styled',
    sourceType: 'script',
    majors: [5, 6, 7],
    plain: ['isStyledComponent.withConfig'],
    code: `
const styled = require('styled-components')
const Comp = styled.default.div\`color: red;\`
exports.Comp = Comp
exports.check = () => {
  if (styled.isStyledComponent(Comp) !== true) throw new Error('member helper rejected the tag')
}
`,
  },
  {
    name: 'esm default and named helpers via commonjs transform',
    sourceType: 'module',
    modules: 'commonjs',
    majors: [5, 6, 7],
    plain: ['isStyledComponent.withConfig'],
    code: `
import styled, { css, isStyledComponent } from 'styled-components'
export const helper = css\`color: blue;\`
export const Comp = styled.div\`color: red;\`
export function check() {
  if (isStyledComponent(Comp) !== true) throw new Error('named helper rejected the tag')
}
`,
  },
  {
    name: 'esm aliased styled via commonjs transform',
    sourceType: 'module',
    modules: 'commonjs',
    majors: [6, 7],
    plain: ['isStyledComponent.withConfig'],
    code: `
import { styled as sc, isStyledComponent } from 'styled-components'
export const Comp = sc.div\`color: red;\`
export function check() {
  if (isStyledComponent(Comp) !== true) throw new Error('alias rejected the tag')
}
`,
  },
  {
    name: 'esm namespace via commonjs transform',
    sourceType: 'module',
    modules: 'commonjs',
    majors: [5, 6, 7],
    plain: [
      'isStyledComponent.withConfig',
      "['createTheme'].withConfig",
      'css.withConfig',
      "['css'].withConfig",
    ],
    code: `
import * as ns from 'styled-components'
export const Comp = ns.default.div\`color: red;\`
export function check() {
  if (ns.isStyledComponent(Comp) !== true) throw new Error('namespace helper rejected the tag')
  if (typeof ns.default.isStyledComponent === 'function') {
    if (ns.default.isStyledComponent(Comp) !== true) {
      throw new Error('namespace default helper rejected the tag')
    }
  }
  if (typeof ns.default.createTheme === 'function') ns.default['createTheme']({ color: 'red' })
  if (typeof ns['css'] === 'function') ns['css']\`color: red;\`
  if (typeof ns.default.css === 'function') ns.default.css\`color: blue;\`
}
`,
  },
  {
    name: 'cjs require, default member and computed helpers',
    sourceType: 'script',
    majors: [5, 6, 7],
    plain: [
      'isStyledComponent.withConfig',
      "['isStyledComponent'].withConfig",
      'createTheme.withConfig',
      "['createTheme'].withConfig",
      'css.withConfig',
      "['css'].withConfig",
    ],
    code: `
const sc = require('styled-components')
const Comp = sc.default.div\`color: red;\`
const ViaComputedTag = sc.default['div']\`color: blue;\`
exports.Comp = Comp
exports.ViaComputedTag = ViaComputedTag
exports.check = () => {
  if (sc['isStyledComponent'](Comp) !== true) throw new Error('computed helper rejected the tag')
  if (sc['isStyledComponent'](ViaComputedTag) !== true) {
    throw new Error('computed helper rejected the computed tag')
  }
  if (typeof sc.default.isStyledComponent === 'function') {
    if (sc.default.isStyledComponent(Comp) !== true) {
      throw new Error('default member helper rejected the tag')
    }
  }
  if (typeof sc.default.createTheme === 'function') sc.default['createTheme']({ color: 'red' })
  if (typeof sc['css'] === 'function') sc['css']\`color: red;\`
  if (typeof sc.default.css === 'function') sc.default.css\`color: blue;\`
  if (typeof sc['keyframes'] === 'function') sc['keyframes']\`from { opacity: 0; } to { opacity: 1; }\`
}
`,
  },
  {
    name: 'cjs require, computed tag',
    sourceType: 'script',
    majors: [7],
    plain: ['isStyledComponent.withConfig'],
    code: `
const sc = require('styled-components')
const Comp = sc['div']\`color: red;\`
exports.Comp = Comp
exports.check = () => {
  if (sc['isStyledComponent'](Comp) !== true) throw new Error('computed helper rejected the tag')
}
`,
  },
  {
    name: 'native esm, default import through .default',
    sourceType: 'module',
    modules: false,
    majors: [5, 6, 7],
    plain: ['isStyledComponent.withConfig'],
    code: `
import styled from 'styled-components'
export const Comp = styled.default.div\`color: red;\`
export function check() {
  if (styled.isStyledComponent(Comp) !== true) throw new Error('esm helper rejected the tag')
}
`,
  },
  {
    name: 'native esm, direct tag',
    sourceType: 'module',
    modules: false,
    majors: [5, 6, 7],
    packagingLimitBelow: 7,
    plain: ['isStyledComponent.withConfig'],
    code: `
import styled from 'styled-components'
export const Comp = styled.div\`color: red;\`
export function check() {
  if (styled.isStyledComponent(Comp) !== true) throw new Error('esm helper rejected the tag')
}
`,
  },
]

// Compact import x access x export matrix. Compile-only: the full generator is
// the audit harness, and this is the slice `node scripts/compat.js` always runs.
// Every factory binding uses open mode: unknown names are decorated, and object
// methods plus known non-tag exports are not. A namespace import uses the same
// member rules because a CommonJS transform binds it to the module exports.
const MATRIX_OPEN_SKIP = new Set([
  'isStyledComponent',
  'css',
  'hasOwnProperty',
  'toString',
])
const MATRIX_IMPORTS = [
  {
    name: 'require sc',
    sourceType: 'script',
    bind: 'sc',
    head: `const sc = require('styled-components')`,
  },
  {
    name: 'import styled',
    sourceType: 'module',
    bind: 'styled',
    head: `import styled from 'styled-components'`,
  },
  {
    name: 'import sc',
    sourceType: 'module',
    bind: 'sc',
    head: `import sc from 'styled-components'`,
  },
  {
    name: 'import { styled as s }',
    sourceType: 'module',
    bind: 's',
    head: `import { styled as s } from 'styled-components'`,
  },
  {
    name: 'import * as ns',
    sourceType: 'module',
    bind: 'ns',
    head: `import * as ns from 'styled-components'`,
  },
]
const MATRIX_ACCESS = [
  { name: 'dot', expr: (b, x) => `${b}.${x}` },
  { name: 'default.dot', expr: (b, x) => `${b}.default.${x}` },
  { name: 'computed', expr: (b, x) => `${b}['${x}']` },
  { name: 'default.computed', expr: (b, x) => `${b}.default['${x}']` },
  { name: 'computed-default.dot', expr: (b, x) => `${b}['default'].${x}` },
]
const MATRIX_EXPORTS = [
  'div',
  'View',
  'isStyledComponent',
  'css',
  'hasOwnProperty',
  'somethingNew',
  'box',
  'foo',
  'feNotAFilter',
  'marquee',
]
const matrixMemberDecorated = name => !MATRIX_OPEN_SKIP.has(name)

for (const imp of MATRIX_IMPORTS) {
  for (const access of MATRIX_ACCESS) {
    for (const name of MATRIX_EXPORTS) {
      const decorated = matrixMemberDecorated(name)
      CASES.push({
        name: `matrix ${imp.name} ${access.name} ${name}`,
        sourceType: imp.sourceType,
        compileOnly: true,
        expectWithConfig: decorated,
        code: `${imp.head}\nconst Comp = ${access.expr(imp.bind, name)}\`color: red;\`\n`,
      })
    }
  }
  for (const call of [
    { name: 'call', expr: b => `${b}(Base)`, absent: [] },
    { name: 'default.call', expr: b => `${b}.default(Base)`, absent: [] },
    {
      name: 'computed-default.call',
      expr: b => `${b}['default'](Base)`,
      absent: [`['default'].withConfig`],
      present: [`['default'](Base).withConfig`],
    },
  ]) {
    CASES.push({
      name: `matrix ${imp.name} ${call.name}`,
      sourceType: imp.sourceType,
      compileOnly: true,
      expectWithConfig: true,
      absent: call.absent,
      present: call.present,
      code: `${imp.head}\nfunction Base(props) { return props.children || null }\nconst Comp = ${call.expr(imp.bind)}` + '`color: red;`\n',
    })
  }
}

CASES.push(
  {
    name: 'matrix shadow param is not the require',
    sourceType: 'script',
    compileOnly: true,
    expectWithConfig: true,
    absent: ['sc.div.withConfig'],
    code: `
const sc = require('styled-components')
function make(sc) { return sc.div\`color: red;\` }
const Comp = make({ div: s => () => null })
const Real = sc.default.div\`color: blue;\`
`,
  },
  {
    name: 'matrix reassigned require is not decorated',
    sourceType: 'script',
    compileOnly: true,
    expectWithConfig: true,
    absent: ['sc.div.withConfig'],
    code: `
const real = require('styled-components')
let sc = require('styled-components')
sc = { div: s => () => null }
const Comp = sc.div\`color: red;\`
const Real = real.default.div\`color: blue;\`
`,
  },
  {
    name: 'matrix computed variable key stays decorated',
    sourceType: 'script',
    compileOnly: true,
    expectWithConfig: true,
    present: ['sc.default[css].withConfig'],
    code: `
const sc = require('styled-components')
const css = 'div'
const Comp = sc.default[css]\`color: red;\`
`,
  },
  {
    name: 'matrix object method and unknown export do not crash',
    sourceType: 'script',
    majors: [5, 6, 7],
    plain: ['hasOwnProperty.withConfig', 'toString.withConfig'],
    code: `
const sc = require('styled-components')
const Comp = sc.default.div\`color: red;\`
exports.Comp = Comp
exports.check = () => {
  const has = sc.hasOwnProperty('css')
  if (typeof has !== 'boolean') throw new Error('hasOwnProperty was rewritten')
  if (typeof sc.toString() !== 'string') throw new Error('toString was rewritten')
}
`,
  },
  {
    name: 'matrix computed default call decorates the result',
    sourceType: 'script',
    majors: [5, 6, 7],
    plain: ["['default'].withConfig"],
    present: ["['default'](Base).withConfig"],
    code: `
const sc = require('styled-components')
function Base(props) { return props.children || null }
const Comp = sc['default'](Base)\`color: red;\`
exports.Comp = Comp
exports.check = () => {
  if (!Comp.styledComponentId) throw new Error('computed default call was not decorated')
}
`,
  },
  {
    name: 'matrix computed const helper key is not decorated',
    sourceType: 'script',
    compileOnly: true,
    expectWithConfig: false,
    code: `
const sc = require('styled-components')
const name = 'css'
const Comp = sc[name]\`color: red;\`
const Other = sc[\`css\`]\`color: blue;\`
const Third = sc.default[name]\`color: green;\`
`,
  },
  {
    name: 'matrix computed const tag and spelled helper are decorated',
    sourceType: 'script',
    compileOnly: true,
    expectWithConfig: true,
    present: ['sc[tag].withConfig', 'sc[css].withConfig'],
    absent: ['sc[name].withConfig', 'sc[`css`].withConfig'],
    code: `
const sc = require('styled-components')
const tag = 'box'
const css = 'div'
const name = 'css'
const Comp = sc[tag]\`color: red;\`
const ViaDiv = sc[css]\`color: blue;\`
const Skipped = sc[name]\`color: green;\`
const SkippedTpl = sc[\`css\`]\`color: orange;\`
`,
  },
  {
    name: 'matrix unresolved computed key on require is not decorated',
    sourceType: 'script',
    compileOnly: true,
    expectWithConfig: false,
    code: `
const sc = require('styled-components')
let dynamic = 'css'
const bag = { key: 'css' }
const { key: fromBag } = bag
const Comp = sc[dynamic]\`color: red;\`
const FromBag = sc[fromBag]\`color: blue;\`
const Folded = sc[\`\${'css'}\`]\`color: green;\`
`,
  },
  {
    name: 'matrix unresolved computed key on styled import is decorated',
    sourceType: 'module',
    compileOnly: true,
    expectWithConfig: true,
    present: ['styled[dynamic].withConfig', 's2[dynamic].withConfig'],
    absent: ['styled[css].withConfig'],
    code: `
import styled, { css } from 'styled-components'
const s2 = styled
let dynamic = 'div'
const Comp = styled[dynamic]\`color: red;\`
const Alias = s2[dynamic]\`color: blue;\`
const Helper = styled[css]\`color: green;\`
`,
  },
  {
    name: 'matrix unresolved computed key on styled alias is not decorated',
    sourceType: 'module',
    compileOnly: true,
    expectWithConfig: true,
    present: ['s.box.withConfig'],
    absent: ['s[dynamic].withConfig', 's[themeKey].withConfig'],
    code: `
import { styled as s, ThemeProvider as themeKey } from 'styled-components'
let dynamic = 'div'
const Comp = s.box\`color: red;\`
const Skipped = s[dynamic]\`color: blue;\`
const SkippedImport = s[themeKey]\`color: green;\`
`,
  },
  {
    name: 'matrix prototype members are not decorated',
    sourceType: 'script',
    compileOnly: true,
    expectWithConfig: true,
    present: ['sc.div.withConfig'],
    absent: [
      '__lookupGetter__.withConfig',
      '__lookupSetter__.withConfig',
      '__proto__.withConfig',
      '.bind.withConfig',
      '.apply.withConfig',
      '.call.withConfig',
      '.length.withConfig',
      '.name.withConfig',
      '.arguments.withConfig',
      '.caller.withConfig',
    ],
    code: `
const sc = require('styled-components')
const Comp = sc.div\`color: red;\`
const Lookup = sc.__lookupGetter__\`x\`
const LookupSet = sc.__lookupSetter__\`x\`
const Proto = sc.__proto__\`x\`
const Bound = sc.bind\`x\`
const Applied = sc.apply\`x\`
const Called = sc.call\`x\`
const Len = sc.length\`x\`
const Named = sc.name\`x\`
const Args = sc.arguments\`x\`
const Caller = sc.caller\`x\`
`,
  },
  {
    name: 'matrix require use before reassignment stays decorated',
    sourceType: 'script',
    compileOnly: true,
    expectWithConfig: true,
    present: ['Before = sc.div.withConfig'],
    absent: ['After = sc.div.withConfig'],
    code: `
let sc = require('styled-components')
const Before = sc.div\`color: red;\`
sc = { div: s => () => null }
const After = sc.div\`color: blue;\`
`,
  },
  {
    name: 'matrix require use in nested function is not decorated',
    sourceType: 'script',
    compileOnly: true,
    expectWithConfig: true,
    present: ['Before = sc.div.withConfig'],
    absent: ['sc.span.withConfig', 'After = sc.div.withConfig'],
    code: `
let sc = require('styled-components')
const Before = sc.div\`color: red;\`
function writtenAbove() { return sc.span\`color: blue;\` }
sc = { span: s => () => null, div: s => () => null }
const Late = writtenAbove()
const After = sc.div\`color: green;\`
`,
  },
  {
    name: 'matrix require use inside reassignment loop is not decorated',
    sourceType: 'script',
    compileOnly: true,
    expectWithConfig: true,
    present: ['First = sc.div.withConfig'],
    absent: ['Comp = sc.div.withConfig', 'After = sc.div.withConfig'],
    code: `
let sc = require('styled-components')
const First = sc.div\`color: red;\`
for (let i = 0; i < 2; i++) {
  const Comp = sc.div\`color: blue;\`
  sc = { div: s => () => null }
}
const After = sc.div\`color: green;\`
`,
  },
  {
    name: 'closure over reassigned require does not throw',
    sourceType: 'script',
    majors: [5, 6, 7],
    plain: ['sc.span.withConfig'],
    present: ['sc.default.div.withConfig'],
    code: `
let sc = require('styled-components')
const real = sc
const Comp = sc.default.div\`color: red;\`
function writtenAbove() { return sc.span\`color: blue;\` }
exports.Comp = Comp
exports.check = () => {
  if (typeof real.span !== 'function') return
  sc = { span: s => () => null, div: s => () => null }
  const Late = writtenAbove()
  if (typeof Late !== 'function') throw new Error('closure did not return the stand-in')
}
`,
  },
  {
    name: 'loop that reassigns require does not throw',
    sourceType: 'script',
    majors: [5, 6, 7],
    plain: ['sc.div.withConfig'],
    present: ['sc.default.div.withConfig'],
    code: `
let sc = require('styled-components')
const Comp = sc.default.div\`color: red;\`
exports.Comp = Comp
exports.check = () => {
  if (typeof sc.div !== 'function') return
  for (let i = 0; i < 2; i++) {
    sc.div\`color: blue;\`
    sc = { div: s => () => null }
  }
}
`,
  },
  {
    name: 'prototype members do not throw',
    sourceType: 'script',
    majors: [5, 6, 7],
    plain: ['__lookupGetter__.withConfig', '.bind.withConfig'],
    present: ['sc.default.div.withConfig'],
    code: `
const sc = require('styled-components')
const Comp = sc.default.div\`color: red;\`
exports.Comp = Comp
exports.check = () => {
  if (typeof sc.__lookupGetter__ !== 'function' || typeof sc.bind !== 'function') return
  sc.__lookupGetter__\`x\`
  const bound = sc.bind\`x\`
  if (typeof bound !== 'function') throw new Error('bind was decorated')
}
`,
  },
  {
    name: 'unresolved require computed key does not throw',
    sourceType: 'script',
    majors: [5, 6, 7],
    plain: ['sc[dynamic].withConfig'],
    present: ['sc.default.div.withConfig', 'sc.default[css].withConfig'],
    code: `
const sc = require('styled-components')
const css = 'div'
let dynamic = 'css'
const Comp = sc.default.div\`color: red;\`
const Kept = sc.default[css]\`color: blue;\`
exports.Comp = Comp
exports.check = () => {
  const helper = sc[dynamic]\`color: green;\`
  if (helper == null) throw new Error('unresolved key did not return the helper')
  if (!Kept.styledComponentId) throw new Error('folded default key lost its id')
}
`,
  }
)

const parseOptions = argv => {
  const { values } = parseArgs({
    args: argv,
    strict: true,
    options: { base: { type: 'string', default: 'origin/main' } },
  })
  return values
}

const npmJson = args => {
  const result = spawnSync('npm', args, { encoding: 'utf8' })
  if (result.status !== 0) {
    throw new Error(
      (result.stderr || result.stdout || `npm ${args.join(' ')} failed`).trim()
    )
  }
  return JSON.parse(result.stdout)
}

const latestOfMajor = major => {
  const data = npmJson(['view', `styled-components@${major}`, 'version', '--json'])
  const versions = Array.isArray(data) ? data : [data]
  return versions[versions.length - 1]
}

const latestV7Prerelease = () => {
  const tags = npmJson(['view', 'styled-components', 'dist-tags', '--json'])
  const matches = Object.entries(tags).filter(
    ([, version]) => version.startsWith('7.') && version.includes('-')
  )
  if (!matches.length) throw new Error('no v7 prerelease dist-tag on styled-components')
  matches.sort((left, right) => (left[1] < right[1] ? -1 : 1))
  return matches[matches.length - 1][1]
}

const latestReact19 = () => {
  const data = npmJson(['view', 'react@19', 'version', '--json'])
  const versions = Array.isArray(data) ? data : [data]
  return versions[versions.length - 1]
}

const loadPlugin = entry => {
  const loaded = require(entry)
  return loaded.default || loaded
}

const compile = (plugin, source) => {
  const options = {
    babelrc: false,
    configFile: false,
    filename: VIRTUAL_FILE,
    sourceType: source.sourceType,
    ast: false,
    plugins: [[plugin, {}]],
  }
  if (source.modules !== undefined) {
    options.presets = [[presetEnv, { modules: source.modules, targets: { node: '22' } }]]
  }
  return babel.transformSync(source.code, options).code
}

const ensureRuntime = (spec, react) => {
  const dir = path.join(CACHE, spec.replace(/[^a-z0-9.-]+/gi, '_'))
  const stampPath = path.join(dir, '.compat-stamp')
  const stamp = `${spec}\n${react}`
  if (fs.existsSync(stampPath) && fs.readFileSync(stampPath, 'utf8') === stamp) return dir
  fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ private: true }))
  const result = spawnSync(
    'npm',
    [
      'install',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      `styled-components@${spec}`,
      `react@${react}`,
      `react-dom@${react}`,
      `react-is@${react}`,
    ],
    { cwd: dir, encoding: 'utf8', timeout: 180000 }
  )
  if (result.status !== 0) {
    throw new Error(
      `install styled-components@${spec} failed\n${result.stderr || result.stdout}`
    )
  }
  fs.writeFileSync(stampPath, stamp)
  return dir
}

const CJS_RUNNER = `
const React = require('react')
const { renderToString } = require('react-dom/server')
const sc = require('styled-components')
const compiled = require('./compiled.cjs')
const ServerStyleSheet = sc.ServerStyleSheet
const sheet = new ServerStyleSheet()
let html = null
let css = null
let renderError = null
try {
  html = renderToString(sheet.collectStyles(React.createElement(compiled.Comp)))
  css = sheet.getStyleTags()
} catch (error) {
  renderError = error && error.message
} finally {
  if (typeof sheet.seal === 'function') sheet.seal()
}
let checkError = null
try {
  compiled.check()
} catch (error) {
  checkError = error && error.message
}
const displayName = compiled.Comp && compiled.Comp.displayName
const ids = css ? css.match(/sc-[a-z0-9]+-\\d+/g) : null
process.stdout.write(JSON.stringify({ renderError, checkError, displayName, ids, css, html: html ? html.length : 0 }))
`

const ESM_RUNNER = `
import React from 'react'
import { renderToString } from 'react-dom/server'
import sc from 'styled-components'
import { Comp, check } from './compiled.mjs'
const ServerStyleSheet = sc.ServerStyleSheet
const sheet = new ServerStyleSheet()
let html = null
let css = null
let renderError = null
try {
  html = renderToString(sheet.collectStyles(React.createElement(Comp)))
  css = sheet.getStyleTags()
} catch (error) {
  renderError = error && error.message
} finally {
  if (typeof sheet.seal === 'function') sheet.seal()
}
let checkError = null
try {
  check()
} catch (error) {
  checkError = error && error.message
}
const displayName = Comp && Comp.displayName
const ids = css ? css.match(/sc-[a-z0-9]+-\\d+/g) : null
process.stdout.write(JSON.stringify({ renderError, checkError, displayName, ids, css, html: html ? html.length : 0 }))
`

const execute = (runtimeDir, code, nativeEsm) => {
  const dir = nativeEsm ? path.join(runtimeDir, 'esm') : runtimeDir
  fs.mkdirSync(dir, { recursive: true })
  if (nativeEsm) {
    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ private: true, type: 'module' })
    )
    const link = path.join(dir, 'node_modules')
    if (!fs.existsSync(link)) {
      fs.symlinkSync(path.join(runtimeDir, 'node_modules'), link, 'dir')
    }
    fs.writeFileSync(path.join(dir, 'compiled.mjs'), code)
    fs.writeFileSync(path.join(dir, 'runner.mjs'), ESM_RUNNER)
  } else {
    fs.writeFileSync(path.join(dir, 'compiled.cjs'), code)
    fs.writeFileSync(path.join(dir, 'runner.cjs'), CJS_RUNNER)
  }
  const runner = nativeEsm ? 'runner.mjs' : 'runner.cjs'
  const result = spawnSync(process.execPath, [runner], {
    cwd: dir,
    encoding: 'utf8',
    timeout: 30000,
  })
  if (result.stdout && result.stdout.trim().startsWith('{')) {
    return JSON.parse(result.stdout)
  }
  const detail = `${result.stderr || ''}${result.stdout || ''}`.trim()
  const brief = detail.split('\n').filter(Boolean).slice(0, 2).join(' ')
  return {
    renderError: brief || `runner exited ${result.status}`,
    checkError: null,
    displayName: null,
    ids: null,
    css: null,
  }
}

const idsEqual = (left, right) => JSON.stringify(left || []) === JSON.stringify(right || [])

const assertHeadShape = (name, code) => {
  const source = CASES.find(item => item.name === name)
  const problems = []
  if (source.expectWithConfig === false) {
    if (code.includes('withConfig')) problems.push('unexpected withConfig')
  } else if (!code.includes('withConfig')) {
    problems.push('plugin did not add withConfig to a tag')
  }
  for (const marker of source.plain || []) {
    if (code.includes(marker)) problems.push(`head output contains ${marker}`)
  }
  for (const marker of source.absent || []) {
    if (code.includes(marker)) problems.push(`head output contains ${marker}`)
  }
  for (const marker of source.present || []) {
    if (!code.includes(marker)) problems.push(`head output missing ${marker}`)
  }
  return problems
}

const reportRun = (label, outcome) => {
  const render = outcome.renderError ? `render FAIL ${outcome.renderError}` : 'render ok'
  const check = outcome.checkError ? `check FAIL ${outcome.checkError}` : 'check ok'
  const id = outcome.ids && outcome.ids.length ? outcome.ids.join(',') : 'none'
  console.log(
    `    ${label}: ${render}; ${check}; displayName=${outcome.displayName || 'none'}; componentId=${id}`
  )
}

const compareRuns = (base, head) => {
  if (base.renderError || head.renderError) return null
  if (base.displayName !== head.displayName) {
    return `displayName ${base.displayName} vs ${head.displayName}`
  }
  if (!idsEqual(base.ids, head.ids)) {
    return `componentId ${(base.ids || []).join(',')} vs ${(head.ids || []).join(',')}`
  }
  if (base.css !== head.css) return 'generated CSS differs'
  return null
}

const loadFromConfig = (filename, contents) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bpsc-compat-config-'))
  const configFile = path.join(dir, filename)
  fs.writeFileSync(configFile, contents)
  if (filename.endsWith('.mjs')) {
    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ private: true, type: 'module' })
    )
  }
  const output = babel.transformSync('const sc = require("styled-components"); sc.div`color: red;`', {
    babelrc: false,
    configFile,
    filename: VIRTUAL_FILE,
    sourceType: 'script',
    ast: false,
  })
  fs.rmSync(dir, { recursive: true, force: true })
  if (!output.code || !output.code.includes('withConfig')) {
    throw new Error(`plugin did not run from ${filename}`)
  }
}

const checkConfigs = pluginEntry => {
  const pluginPath = JSON.stringify(pluginEntry)
  loadFromConfig('babel.config.js', `module.exports = { plugins: [${pluginPath}] }\n`)
  loadFromConfig('.babelrc', JSON.stringify({ plugins: [pluginEntry] }))
  loadFromConfig('babel.config.mjs', `export default { plugins: [${pluginPath}] }\n`)
  console.log('configs: babel.config.js, .babelrc, and babel.config.mjs load the plugin')
}

const main = async () => {
  const options = parseOptions(process.argv.slice(2))
  const versions = [
    { major: 5, spec: latestOfMajor(5), react: REACT[5] },
    { major: 6, spec: latestOfMajor(6), react: REACT[6] },
    { major: 7, spec: latestV7Prerelease(), react: latestReact19() },
  ]
  console.log(
    versions.map(item => `v${item.major} ${item.spec} (react ${item.react})`).join(', ')
  )
  const runtimes = new Map(
    versions.map(item => [item.major, ensureRuntime(item.spec, item.react)])
  )

  await withWorkDir(async workDir => {
    const baseEntry = buildRef(options.base, path.join(workDir, 'base'))
    const headEntry = buildWorkingTree(path.join(workDir, 'head'))
    const basePlugin = loadPlugin(baseEntry)
    const headPlugin = loadPlugin(headEntry)
    checkConfigs(headEntry)

    for (const source of CASES) {
      console.log(source.name)
      const headCode = compile(headPlugin, source)
      for (const problem of assertHeadShape(source.name, headCode)) {
        console.error(`  head: ${problem}`)
        process.exitCode = 1
      }
      if (source.compileOnly) continue
      const baseCode = compile(basePlugin, source)
      for (const version of versions.filter(item => source.majors.includes(item.major))) {
        console.log(`  v${version.major} ${version.spec}`)
        const nativeEsm = source.modules === false
        const baseRun = execute(runtimes.get(version.major), baseCode, nativeEsm)
        const headRun = execute(runtimes.get(version.major), headCode, nativeEsm)
        reportRun('base', baseRun)
        reportRun('head', headRun)
        const knownLimit =
          source.packagingLimitBelow && version.major < source.packagingLimitBelow
        if (knownLimit && (headRun.renderError || headRun.checkError)) {
          console.log('    known packaging limit on this version, not a plugin failure')
          continue
        }
        if (headRun.renderError || headRun.checkError) process.exitCode = 1
        const mismatch = compareRuns(baseRun, headRun)
        if (mismatch) {
          console.error(`    mismatch: ${mismatch}`)
          process.exitCode = 1
        } else if (!baseRun.renderError && !headRun.renderError) {
          console.log('    css, displayName, and componentId match')
        }
      }
    }
  })

  if (process.exitCode) {
    console.error('compat: failed')
  } else {
    console.log('compat: ok')
  }
}

main().catch(error => {
  console.error(error && error.stack ? error.stack : error)
  process.exitCode = 1
})

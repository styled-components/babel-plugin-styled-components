// Runs the built plugin (`lib/`) through Babel 8 over the fixture suite and
// compares against the same output.js / error.js files Jest uses on Babel 7.
// A fixture that also runs Babel's own presets or plugins has a snapshot that
// differs between majors by design, so it runs with this plugin alone and
// must match Babel 7's output instead. Babel 8 ships as ESM only, which
// Jest's module sandbox cannot require, so this runs as plain Node. Run with
// `pnpm build && pnpm test:babel8`.
const fs = require('fs')
const path = require('path')
const babel7 = require('@babel/core')
const babel = require('babel8')
const presetTypescript = require('babel8-preset-typescript').default

const ROOT = path.resolve(__dirname, '..')
const FIXTURES = path.join(ROOT, 'test', 'fixtures')
const PLUGIN = '../../../src'

const usesOtherBabelPlugins = config =>
  [...(config.presets || []), ...(config.plugins || [])].some(
    entry => (Array.isArray(entry) ? entry[0] : entry) !== PLUGIN
  )

const SKIP = {
  'imports-inside-exported-ambient-namespace':
    'Babel 8 rejects an import inside `declare namespace` while parsing, as TypeScript does',
}

// Fixtures always parse as code.js, so the extension rules run here
const TYPESCRIPT_CASES = [
  {
    file: 'a.ts',
    code: 'export const C = <any>B',
    expected: 'export const C = B;\n',
  },
  {
    file: 'a.tsx',
    code: 'const A = <div />',
    expected: 'const A = <div />;\n',
  },
]

// Mirrors the babel-test patch in patches/ so error.js matches across machines
const normalizeError = e =>
  String(e)
    .replace(/\u001b\[[0-9;]*m/g, '')
    .replace(
      new RegExp(
        ROOT.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(
          /\\\\|\//g,
          '[\\\\/]'
        ),
        'gi'
      ),
      '<cwd>'
    )
    .replace(/<cwd>[^\s:]*/g, p => p.replace(/\\/g, '/')) + '\n'

const read = file =>
  fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null

// Babel reads .babelrc as JSON5; the fixtures only lean on trailing commas
const readConfig = dir =>
  JSON.parse(read(path.join(dir, '.babelrc')).replace(/,(\s*[\]}])/g, '$1'))

const transform = async (instance, code, options) => {
  try {
    const result = await instance.transformAsync(code, {
      ...options,
      babelrc: false,
      configFile: false,
      cwd: ROOT,
    })
    return result.code + '\n'
  } catch (e) {
    return normalizeError(e)
  }
}

const main = async () => {
  const lib = path.join(ROOT, 'lib', 'index.js')
  if (!fs.existsSync(lib)) {
    console.error('lib/ is missing. Run `pnpm build` first.')
    process.exit(1)
  }

  let passed = 0
  const skipped = []
  const failed = []

  for (const name of fs.readdirSync(FIXTURES).sort()) {
    const dir = path.join(FIXTURES, name)
    const config = readConfig(dir)

    if (SKIP[name]) {
      skipped.push(`${name}: ${SKIP[name]}`)
      continue
    }

    const filename = path.join(dir, 'code.js')
    const code = read(filename)
    const pluginOnly = usesOtherBabelPlugins(config)
    const options = {
      ...config,
      presets: [],
      plugins: config.plugins
        .filter(entry => (Array.isArray(entry) ? entry[0] : entry) === PLUGIN)
        .map(entry => (Array.isArray(entry) ? [lib, ...entry.slice(1)] : lib)),
      filename,
    }

    const actual = await transform(babel, code, options)
    const expected = pluginOnly
      ? await transform(babel7, code, options)
      : (read(path.join(dir, 'output.js')) ?? read(path.join(dir, 'error.js')))
    if (actual === expected) passed++
    else failed.push({ name, expected, actual })
  }

  for (const { file, code, expected } of TYPESCRIPT_CASES) {
    const actual = await transform(babel, code, {
      filename: path.join(ROOT, file),
      plugins: [lib],
      presets: [presetTypescript],
    })
    if (actual === expected) passed++
    else failed.push({ name: file, expected, actual })
  }

  for (const { name, expected, actual } of failed) {
    console.log(`\n✗ ${name}\n--- expected\n${expected}--- actual\n${actual}`)
  }
  console.log(`\nSkipped on Babel ${babel.version}:`)
  for (const line of skipped) console.log(`  ${line}`)
  console.log(
    `\nBabel ${babel.version}: ${passed} passed, ${failed.length} failed, ${skipped.length} skipped`
  )
  if (failed.length) process.exit(1)
}

main()

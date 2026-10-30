// Runs the built plugin (`lib/`) through Babel 8 over the fixture suite and
// compares against the same output.js / error.js files Jest uses on Babel 7.
// Babel 8 ships as ESM only, which Jest's module sandbox cannot require, so
// this runs as plain Node. Run with `pnpm build && pnpm test:babel8`.
const fs = require('fs')
const path = require('path')
const babel = require('babel8')

const ROOT = path.resolve(__dirname, '..')
const FIXTURES = path.join(ROOT, 'test', 'fixtures')
const PLUGIN = '../../../src'

// Their snapshots are mostly Babel's own output (helpers, module interop,
// preset-env targets), which differs between majors by design.
const usesOtherBabelPlugins = config =>
  [...(config.presets || []), ...(config.plugins || [])].some(
    entry => (Array.isArray(entry) ? entry[0] : entry) !== PLUGIN
  )

const SKIP = {
  'imports-inside-exported-ambient-namespace':
    'Babel 8 rejects an import inside `declare namespace` while parsing, as TypeScript does',
}

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

    if (SKIP[name] || usesOtherBabelPlugins(config)) {
      skipped.push(
        `${name}: ${SKIP[name] || 'output depends on Babel presets or plugins'}`
      )
      continue
    }

    const filename = path.join(dir, 'code.js')
    const plugins = config.plugins.map(entry =>
      Array.isArray(entry) ? [lib, ...entry.slice(1)] : lib
    )

    let actual
    try {
      const result = await babel.transformAsync(read(filename), {
        ...config,
        plugins,
        babelrc: false,
        configFile: false,
        cwd: ROOT,
        filename,
      })
      actual = result.code + '\n'
    } catch (e) {
      actual = normalizeError(e)
    }

    const expected =
      read(path.join(dir, 'output.js')) ?? read(path.join(dir, 'error.js'))
    if (actual === expected) passed++
    else failed.push({ name, expected, actual })
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

const fs = require('fs')
const os = require('os')
const path = require('path')
const babel = require('@babel/core')
const jsxSyntax = require('@babel/plugin-syntax-jsx').default

const ROOT = path.resolve(__dirname, '../..')

// Plugin options each named config passes to both variants.
const CONFIGS = {
  default: {},
  all: {
    pure: true,
    topLevelImportPaths: ['@acme/styled', '@acme/*/css'],
    namespace: 'ns',
  },
  bare: {
    ssr: false,
    displayName: false,
    minify: false,
    transpileTemplateLiterals: false,
  },
}

// Inputs are transformed as if they lived here, so path-derived output (file hashes, display names) stays stable.
const VIRTUAL_FILENAME = path.join(ROOT, 'bench-src', 'components', 'Large.js')

// Runs one transform. A null plugin measures the parser and generator alone.
const transform = ({ code, plugin, config, generate }) =>
  babel.transformSync(code, {
    babelrc: false,
    configFile: false,
    filename: VIRTUAL_FILENAME,
    code: generate,
    ast: false,
    plugins: plugin ? [[plugin, config]] : [jsxSyntax],
  })

const makeWorkDir = () =>
  fs.mkdtempSync(path.join(os.tmpdir(), 'styled-bench-'))

const removeDir = dir => fs.rmSync(dir, { recursive: true, force: true })

// Runs body with a fresh work dir that is removed on return, on a thrown error, and on SIGINT or SIGTERM.
const withWorkDir = async body => {
  const workDir = makeWorkDir()
  const exitAfterCleanup = code => () => {
    removeDir(workDir)
    process.exit(code)
  }
  process.once('SIGINT', exitAfterCleanup(130))
  process.once('SIGTERM', exitAfterCleanup(143))
  try {
    return await body(workDir)
  } finally {
    removeDir(workDir)
  }
}

module.exports = { CONFIGS, ROOT, transform, withWorkDir }

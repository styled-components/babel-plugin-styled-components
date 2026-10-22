const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { ROOT } = require('./shared')

const BABEL_BIN = path.join(ROOT, 'node_modules/.bin/babel')
const MAX_ARCHIVE_BYTES = 64 * 1024 * 1024

const fail = (message, result) => {
  const detail = result.error
    ? result.error.message
    : String(result.stderr || '').trim()
  throw new Error(`${message}\n${detail}`)
}

// The built plugin requires its dependencies by bare name, and the temp dir has no node_modules of its own.
const linkDependencies = dir =>
  fs.symlinkSync(
    path.join(ROOT, 'node_modules'),
    path.join(dir, 'node_modules'),
    'dir'
  )

// Compiles <dir>/src to <dir>/lib with the repo's .babelrc, which the temp dir cannot discover on its own.
const compile = dir => {
  linkDependencies(dir)
  const result = spawnSync(
    BABEL_BIN,
    [
      path.join(dir, 'src'),
      '-d',
      path.join(dir, 'lib'),
      '--no-babelrc',
      '--config-file',
      path.join(ROOT, '.babelrc'),
    ],
    { cwd: ROOT, encoding: 'utf8' }
  )
  if (result.status !== 0)
    fail(`Babel failed to compile src for the bench build in ${dir}`, result)
  const entry = path.join(dir, 'lib/index.js')
  if (!fs.existsSync(entry)) throw new Error(`Babel produced no ${entry}`)
  return entry
}

// Builds the plugin as it stood at a git ref. Pass any ref git resolves locally (a branch, tag, or sha).
const buildRef = (ref, dir) => {
  fs.mkdirSync(dir, { recursive: true })
  const archive = spawnSync('git', ['archive', ref, 'src'], {
    cwd: ROOT,
    maxBuffer: MAX_ARCHIVE_BYTES,
  })
  if (archive.status !== 0) {
    fail(
      `git archive could not read src at ref "${ref}". Fetch it or pass a ref that exists locally with --base.`,
      archive
    )
  }
  const extract = spawnSync('tar', ['-x', '-C', dir], { input: archive.stdout })
  if (extract.status !== 0)
    fail(`tar could not extract src for ref "${ref}" into ${dir}`, extract)
  return compile(dir)
}

// Builds the plugin from the working tree's src. Copies src first so the repo's lib/ is never written.
const buildWorkingTree = dir => {
  fs.mkdirSync(dir, { recursive: true })
  fs.cpSync(path.join(ROOT, 'src'), path.join(dir, 'src'), { recursive: true })
  return compile(dir)
}

module.exports = { buildRef, buildWorkingTree }

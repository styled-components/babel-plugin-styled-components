// A/B benchmark: transforms each generated input with the base ref's plugin and the working tree's plugin,
// interleaved, and reports each plugin's cost as its median time minus the median time with no plugin.
// Run with `pnpm bench`. Flags: --base <ref>, --config default|all|bare, --rounds <n>, --normalize-aliases.
const fs = require('fs')
const path = require('path')
const { parseArgs } = require('util')
const { generateInputs } = require('./gen')
const { buildRef, buildWorkingTree } = require('./build-ref')
const { CONFIGS, transform, withWorkDir } = require('./shared')

const parseOptions = argv => {
  const { values } = parseArgs({
    args: argv,
    strict: true,
    options: {
      base: { type: 'string', default: 'origin/main' },
      config: { type: 'string', default: 'default' },
      rounds: { type: 'string', default: '12' },
      'normalize-aliases': { type: 'boolean', default: false },
    },
  })
  if (!Object.hasOwn(CONFIGS, values.config)) {
    throw new Error(
      `Unknown --config "${values.config}". Use one of: ${Object.keys(CONFIGS).join(', ')}.`
    )
  }
  if (!/^[1-9]\d*$/.test(values.rounds)) {
    throw new Error(
      `--rounds takes a positive whole number, got "${values.rounds}".`
    )
  }
  return {
    base: values.base,
    config: values.config,
    rounds: Number(values.rounds),
    normalizeAliases: values['normalize-aliases'],
  }
}

// Collapses the `_styledN` default-import aliases the plugin injects, so variants compare by shape.
const normalizeAliases = code =>
  code
    .replace(
      /import _styled(, \{[^}]*\})? from "styled-components";/,
      'import _styled from "styled-components";'
    )
    .replace(/\b_styled\d+\(/g, '_styled(')

const shuffle = xs => {
  for (let i = xs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[xs[i], xs[j]] = [xs[j], xs[i]]
  }
  return xs
}

const median = xs => {
  const sorted = [...xs].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

const firstDifference = (left, right) => {
  const a = left.split('\n')
  const b = right.split('\n')
  const index = a.findIndex((line, i) => line !== b[i])
  return {
    line: index + 1,
    left: a[index] ?? '(end of output)',
    right: b[index] ?? '(end of output)',
  }
}

const timeTransform = (code, plugin, config) => {
  const start = process.hrtime.bigint()
  transform({ code, plugin, config, generate: false })
  return Number(process.hrtime.bigint() - start) / 1e6
}

const reportMismatch = ({ options, input, base, current, diff, aliasOnly }) => {
  const hint =
    aliasOnly && !options.normalizeAliases
      ? ' The only difference is the _styledN alias names, so re-run with --normalize-aliases.'
      : ''
  console.error(
    `${options.config} ${input}: ${current} output differs from ${base} at line ${diff.line}.${hint}\n` +
      `  ${base}: ${diff.left}\n` +
      `  ${current}: ${diff.right}`
  )
  process.exitCode = 1
}

const benchInput = ({ options, input, code, variants }) => {
  const config = CONFIGS[options.config]
  const generated = variants.map(
    variant =>
      transform({ code, plugin: variant.plugin, config, generate: true }).code
  )
  const outputs = options.normalizeAliases
    ? generated.map(normalizeAliases)
    : generated
  const mismatch = outputs.findIndex(output => output !== outputs[0])
  if (mismatch !== -1) {
    reportMismatch({
      options,
      input,
      base: variants[0].name,
      current: variants[mismatch].name,
      diff: firstDifference(outputs[0], outputs[mismatch]),
      aliasOnly:
        normalizeAliases(generated[mismatch]) ===
        normalizeAliases(generated[0]),
    })
    return false
  }

  const iters = Math.max(3, Math.round(400000 / code.length))
  const arms = [{ name: 'no-plugin', plugin: null }, ...variants]
  const samples = arms.map(() => [])
  for (let w = 0; w < iters; w++) {
    arms.forEach(arm => timeTransform(code, arm.plugin, config))
  }
  for (let r = 0; r < options.rounds; r++) {
    for (const i of shuffle(arms.map((_, index) => index))) {
      for (let k = 0; k < iters; k++) {
        samples[i].push(timeTransform(code, arms[i].plugin, config))
      }
    }
  }

  const base = median(samples[0])
  const line = arms
    .map((arm, i) => {
      const m = median(samples[i])
      return i === 0
        ? `${arm.name} ${m.toFixed(3)}ms`
        : `${arm.name} +${(m - base).toFixed(3)}ms`
    })
    .join(' | ')
  console.log(`${options.config} ${input.padEnd(13)} ${line}`)
  return true
}

const main = () =>
  withWorkDir(async workDir => {
    const options = parseOptions(process.argv.slice(2))
    const inputDir = path.join(workDir, 'inputs')
    fs.mkdirSync(inputDir)
    const inputs = generateInputs(inputDir)
    const variants = [
      {
        name: 'base',
        plugin: require(buildRef(options.base, path.join(workDir, 'base')))
          .default,
      },
      {
        name: 'current',
        plugin: require(buildWorkingTree(path.join(workDir, 'current')))
          .default,
      },
    ]
    for (const input of inputs) {
      const code = fs.readFileSync(path.join(inputDir, input), 'utf8')
      if (!benchInput({ options, input, code, variants })) return
    }
  })

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})

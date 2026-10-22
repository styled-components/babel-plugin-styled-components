// CPU profile of the working tree's plugin over one generated input. Run with `pnpm bench:profile`.
// Flags: --config default|all|bare, --input small|medium|large|large-cjs, --runs <n>, --target <substring>.
// The .cpuprofile is kept in a temp dir that is printed, so it can be opened in Chrome DevTools.
const fs = require('fs')
const inspector = require('inspector')
const os = require('os')
const path = require('path')
const { pathToFileURL } = require('url')
const { parseArgs } = require('util')
const { generateInputs } = require('./gen')
const { buildWorkingTree } = require('./build-ref')
const { CONFIGS, transform, withWorkDir } = require('./shared')

const INPUTS = ['small', 'medium', 'large', 'large-cjs']
const SAMPLING_INTERVAL_US = 100
const TOP_ROWS = 25

const parseOptions = argv => {
  const { values } = parseArgs({
    args: argv,
    strict: true,
    options: {
      config: { type: 'string', default: 'default' },
      input: { type: 'string', default: 'large' },
      runs: { type: 'string', default: '20' },
      target: { type: 'string', default: '@babel/traverse' },
    },
  })
  if (!Object.hasOwn(CONFIGS, values.config)) {
    throw new Error(
      `Unknown --config "${values.config}". Use one of: ${Object.keys(CONFIGS).join(', ')}.`
    )
  }
  if (!INPUTS.includes(values.input)) {
    throw new Error(
      `Unknown --input "${values.input}". Use one of: ${INPUTS.join(', ')}.`
    )
  }
  if (!/^[1-9]\d*$/.test(values.runs)) {
    throw new Error(
      `--runs takes a positive whole number, got "${values.runs}".`
    )
  }
  return {
    config: values.config,
    input: values.input,
    runs: Number(values.runs),
    target: values.target,
  }
}

const startSession = async () => {
  const session = new inspector.Session()
  session.connect()
  const post = (method, params = {}) =>
    new Promise((resolve, reject) => {
      session.post(method, params, (error, result) =>
        error ? reject(error) : resolve(result)
      )
    })
  await post('Profiler.enable')
  await post('Profiler.setSamplingInterval', { interval: SAMPLING_INTERVAL_US })
  return { post, disconnect: () => session.disconnect() }
}

// Indexes the profile for parent walks and per-frame sample counts.
const indexProfile = profile => {
  const byId = new Map(profile.nodes.map(node => [node.id, node]))
  const parent = new Map()
  profile.nodes.forEach(node =>
    (node.children || []).forEach(child => parent.set(child, node.id))
  )
  const hits = new Map()
  profile.samples.forEach(id => hits.set(id, (hits.get(id) || 0) + 1))
  return { byId, parent, hits, total: profile.samples.length }
}

// Frames inside the built plugin are labeled relative to it. Everything else is labeled by its package path.
const frameLabel = (node, pluginUrl) => {
  const { functionName, url, lineNumber } = node.callFrame
  const file = url.startsWith(pluginUrl)
    ? `plugin/${url.slice(pluginUrl.length)}`
    : url.replace(/^file:\/\//, '').replace(/^.*\/node_modules\//, '')
  return `${functionName || '(anon)'} ${file}:${lineNumber + 1}`
}

const addCount = (map, key, count) => map.set(key, (map.get(key) || 0) + count)

const selfTimes = (index, label) => {
  const totals = new Map()
  for (const [id, count] of index.hits)
    addCount(totals, label(index.byId.get(id)), count)
  return totals
}

const inclusiveTimes = (index, label) => {
  const totals = new Map()
  for (const [id, count] of index.hits) {
    const seen = new Set()
    for (let cur = id; cur !== undefined; cur = index.parent.get(cur)) {
      const key = label(index.byId.get(cur))
      if (seen.has(key)) continue
      seen.add(key)
      addCount(totals, key, count)
    }
  }
  return totals
}

// Attributes each sample under a frame matching target to the nearest plugin frame above that frame.
const nearestPluginCallers = (index, { target, label, pluginUrl }) => {
  const callers = new Map()
  for (const [id, count] of index.hits) {
    let hit = false
    let caller = '(no plugin frame)'
    for (let cur = id; cur !== undefined; cur = index.parent.get(cur)) {
      const node = index.byId.get(cur)
      if (!hit) {
        hit = label(node).includes(target)
      } else if (node.callFrame.url.startsWith(pluginUrl)) {
        caller = label(node)
        break
      }
    }
    if (hit) addCount(callers, caller, count)
  }
  return callers
}

const printRanked = (title, totals, total) => {
  console.log(`\n== ${title} (of ${total} samples)`)
  ;[...totals]
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_ROWS)
    .forEach(([key, count]) =>
      console.log(`${((100 * count) / total).toFixed(1).padStart(5)}%  ${key}`)
    )
}

const summarize = (profile, { target, pluginUrl }) => {
  const index = indexProfile(profile)
  const label = node => frameLabel(node, pluginUrl)
  printRanked('self time', selfTimes(index, label), index.total)
  printRanked('inclusive time', inclusiveTimes(index, label), index.total)
  printRanked(
    `nearest plugin caller of "${target}"`,
    nearestPluginCallers(index, { target, label, pluginUrl }),
    index.total
  )
}

const main = () =>
  withWorkDir(async workDir => {
    const options = parseOptions(process.argv.slice(2))
    const inputDir = path.join(workDir, 'inputs')
    fs.mkdirSync(inputDir)
    generateInputs(inputDir)
    const libEntry = buildWorkingTree(path.join(workDir, 'current'))
    const plugin = require(libEntry).default
    // The profiler reports realpaths, so the plugin prefix must be a realpath too (macOS tmp is a symlink).
    const pluginUrl = pathToFileURL(
      `${fs.realpathSync(path.dirname(libEntry))}${path.sep}`
    ).href
    const code = fs.readFileSync(
      path.join(inputDir, `${options.input}.js`),
      'utf8'
    )
    const config = CONFIGS[options.config]
    const runOnce = () => transform({ code, plugin, config, generate: false })

    runOnce()
    const { post, disconnect } = await startSession()
    await post('Profiler.start')
    for (let i = 0; i < options.runs; i++) runOnce()
    const { profile } = await post('Profiler.stop')
    disconnect()

    const profileDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'styled-bench-profile-')
    )
    const profilePath = path.join(
      profileDir,
      `${options.config}-${options.input}.cpuprofile`
    )
    fs.writeFileSync(profilePath, JSON.stringify(profile))
    console.log(`profile ${profilePath}`)
    summarize(profile, { target: options.target, pluginUrl })
  })

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})

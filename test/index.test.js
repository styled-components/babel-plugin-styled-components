import fs from 'fs'
import path from 'path'
import { create } from 'babel-test'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

const { fixtures } = create({ babelrc: true })

const fixturesDir = path.join(__dirname, 'fixtures')

fixtures('babel-plugin-styled-components', fixturesDir)

describe('fixture snapshots', () => {
  const absolutePath =
    /(^|[\s('"])(\/(Users|home|private|var|tmp|opt)\/|[A-Za-z]:[\\/]|\\\\[^\\\s]+\\)/m

  it('contain no absolute machine paths', () => {
    const leaks = fs
      .readdirSync(fixturesDir)
      .flatMap(name =>
        ['output.js', 'error.js'].map(file => path.join(name, file))
      )
      .filter(file => fs.existsSync(path.join(fixturesDir, file)))
      .filter(file =>
        absolutePath.test(fs.readFileSync(path.join(fixturesDir, file), 'utf8'))
      )

    expect(leaks).toEqual([])
  })
})

describe('runtime dependencies', () => {
  const majors = range =>
    new Set((range.match(/\^\d+/g) || []).map(m => m.slice(1)))
  const pkg = require('../package.json')
  const supported = majors(pkg.peerDependencies['@babel/core'])

  it('accept every @babel/core major the plugin supports', () => {
    const narrower = Object.keys(pkg.dependencies)
      .map(name => [name, require(`${name}/package.json`).peerDependencies])
      .filter(([, peers]) => peers && peers['@babel/core'])
      .filter(([, peers]) =>
        [...supported].some(major => !majors(peers['@babel/core']).has(major))
      )
      .map(([name, peers]) => `${name} ${peers['@babel/core']}`)

    expect(narrower).toEqual([])
  })
})

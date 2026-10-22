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

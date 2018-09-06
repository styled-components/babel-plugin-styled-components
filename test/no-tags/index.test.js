import { transformFileSync } from '@babel/core'
import * as path from 'path'

let mockVersion

jest.mock('styled-components/package.json', () => ({ version: mockVersion }))

beforeEach(() => jest.resetModules())

it('should not swap out the import if styled-components v3 is detected', () => {
  mockVersion = '3.0.0'

  const fixturePath = path.join(__dirname + '/example/index.js')
  const fixture = transformFileSync(fixturePath).code

  expect(fixture).toMatchSnapshot()
})

it('should swap out the import if styled-components v4+ is detected', () => {
  mockVersion = '4.0.0'

  const fixturePath = path.join(__dirname + '/example/index.js')
  const fixture = transformFileSync(fixturePath).code

  expect(fixture).toMatchSnapshot()
})

it('should swap out the import if styled-components v4 beta is detected', () => {
  mockVersion = '4.0.0-beta.0'

  const fixturePath = path.join(__dirname + '/example/index.js')
  const fixture = transformFileSync(fixturePath).code

  expect(fixture).toMatchSnapshot()
})

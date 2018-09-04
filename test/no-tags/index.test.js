import { transformFileSync } from '@babel/core'
import * as path from 'path'

jest.mock('styled-components/package.json', () => ({ version: '4.0.0' }))

it('should swap out the import if styled-components v4+ is detected', () => {
  const fixturePath = path.join(__dirname + '/example.js')
  const fixture = transformFileSync(fixturePath).code

  expect(fixture).toMatchSnapshot()
})

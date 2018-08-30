import { transform } from 'babel-core'
import * as fs from 'fs'

jest.mock('styled-components/package.json', () => ({ version: '4.0.0' }))

it('should swap out the import if styled-components v4+ is detected', () => {
  const fixture = transform(
    fs.readFileSync(__dirname + '/example.js', 'utf8'),
    { plugins: ['./src'] }
  ).code
  expect(fixture).toMatchSnapshot()
})

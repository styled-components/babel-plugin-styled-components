import parser from '../src/dank/parser'

describe('dank parser', () => {
  it('should pass through tokens exactly', () => {
    expect(parser(`
      foo: bar;
    `)).toEqual(`
      foo: bar;
    `)
  })
})

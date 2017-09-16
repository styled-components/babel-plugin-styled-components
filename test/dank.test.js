import parser from '../src/dank/parser'

const parse = (input, expected) => {
  expect(` ${parser(input)} `).toEqual(expected.replace(/[\n\s]+/g, ' '))
}

describe('dank parser', () => {
  it('should pass through unmatched tokens exactly', () => {
    parse(`
      foo: bar;
      &:hover {
        color: black;
        + * { margin: 2rem; }
      }
    `, `
      foo: bar;
      &:hover {
        color: black;
        + * { margin: 2rem; }
      }
    `)
  })

  it.only('should replace a simple interpolation', () => {
    parse(`
      foo: $bar;
    `, `
      foo: \${bar};
    `)
    parse(`
      foo: $bar.baz;
    `, `
      foo: \${bar.baz};
    `)
  })

  it('should reject more complex JS expressions', () => {
    expect(parser(`
      foo: $bar.baz();
    `)).toEqual(`
      foo: $bar.baz();
    `)
    expect(parser(`
      foo: $bar.baz($omg, $ffs);
    `)).toEqual(`
      foo: $bar.baz($omg, $ffs);
    `)
  })

  it('should allow props and theme interpolations', () => {
    expect(parser(`
      foo: $props.x;
      bar: $theme.y;
    `)).toEqual(`
      foo: \${props => props.x};
      bar: \${props => props.theme.y};
    `)
  })

  it('should allow fallbacks', () => {
    expect(parser(`
      foo: $x || 0.5;
      bar: $props.y || lol;
      baz: $theme.z || 'x y z';
    `)).toEqual(`
      foo: \${x || '0.5'};
      bar: \${props => props.x || 'lol'};
      baz: \${props => props.theme.z || 'x y z'};
    `)
  })
})

import parser from '../src/dank/parser'

const parse = (input, expected) => {
  expect(parser(input)).toEqual(expected)
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

  it('should replace a simple interpolation', () => {
    parse(`
      $bar;
    `, `
      \${ bar };
    `)
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
    parse(`
      foo: $bar.baz();
    `, `
      foo: $bar.baz();
    `)
    parse(`
      foo: $bar.baz($omg, $ffs);
    `, `
      foo: $bar.baz($omg, $ffs);
    `)
  })

  it('should allow props and theme interpolations', () => {
    parse(`
      foo: $props.x;
      bar: $theme.y;
    `, `
      foo: \${props => props.x};
      bar: \${props => props.theme.y};
    `)
  })

  it('should allow fallbacks', () => {
    parse(`
      foo: $x || 0.5;
      bar: $props.y || lol;
      baz: $theme.z || 'x y z';
    `, `
      foo: \${x || '0.5'};
      bar: \${props => props.x || 'lol'};
      baz: \${props => props.theme.z || 'x y z'};
    `)
  })
})

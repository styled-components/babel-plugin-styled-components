import parser, { replacer } from '../src/dank/parser'

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
      baz: $theme.z;
    `, `
      foo: \${props => props.x};
      bar: \${props => props.theme.y};
      baz: \${props => props.theme.z};
    `)
  })

  it('should allow fallbacks', () => {
    parse(`
      foo: $x || 0.5;
      bar: $props.y || lol;
      baz: $theme.z || 'x y z';
    `, `
      foo: \${x || '0.5'};
      bar: \${props => props.y || 'lol'};
      baz: \${props => props.theme.z || 'x y z'};
    `)
  })

  it('should allow ternary', () => {
    parse(`
      foo: $x ? 0.5 : 1.0;
      bar: $props.y ? lol : boats;
      baz: $theme.z ? 'x y z' : 'a b c';
    `, `
      foo: \${x ? '0.5' : '1.0'};
      bar: \${props => props.y ? 'lol' : 'boats'};
      baz: \${props => props.theme.z ? 'x y z' : 'a b c'};
    `)
  })

  it('should strip all $s', () => {
    parse(`
      foo: $x ? $y : $z;
      bar: $props.x ? $props.y : $props.z;
    `, `
      foo: \${x ? y : z};
      bar: \${props => props.x ? props.y : props.z};
    `)
  })

  it('should replace within a line', () => {
    parse(`
      animation: $name 0.3s linear infinite;
      transition: $props.name || backup 0.3s linear infinite;
    `, `
      animation: \${name} 0.3s linear infinite;
      transition: \${props => props.name || 'backup'} 0.3s linear infinite;
    `)
  })

  it('should allow optional blocks', () => {
    parse(`
      color: red;
      $props.primary? {
        color: blue;
        something: else;
      }
    `, `
      color: red;
      \${props => props.primary && css\`
        color: blue;
        something: else;
      \`}
    `)
    parse(`
      color: red;
      $props.primary? {
        color: blue;
      }
      $props.secondary? {
        color: blue;
      }
    `, `
      color: red;
      \${props => props.primary && css\`
        color: blue;
      \`}
      \${props => props.secondary && css\`
        color: blue;
      \`}
    `)
  })

  it('should replace before an optional block', () => {
    parse(`
      color: $theme.x;
      $props.primary? {
        red: green;
      }
    `, `
      color: \${props => props.theme.x};
      \${props => props.primary && css\`
        red: green;
      \`}
    `)
  })

  it('should replace within optional blocks like normal', () => {
    parse(`
      color: red;
      $props.primary? {
        color: $external;
        something: $props.dank;
      }
    `, `
      color: red;
      \${props => props.primary && css\`
        color: \${external};
        something: \${props => props.dank};
      \`}
    `)
  })

  it('should replace around optional blocks like normal', () => {
    parse(`
      color: $theme.x;
      $props.primary? {
        color: $external;
        something: $props.dank;
      }
    `, `
      color: \${props => props.theme.x};
      \${props => props.primary && css\`
        color: \${external};
        something: \${props => props.dank};
      \`}
    `)
  })
})

describe.only('replacer', () => {
  it('should replace a single char', () => {
    expect(replacer('abc', [
      { start: 1, end: 2, content: 'd' },
    ])).toEqual('adc')
  })

  it('should replace two single chars', () => {
    expect(replacer('abcd', [
      { start: 1, end: 2, content: 'e' },
      { start: 2, end: 3, content: 'f' },
    ])).toEqual('aefd')
  })

  it('should replace chars with strings', () => {
    expect(replacer('abcd', [
      { start: 1, end: 2, content: ' e ' },
      { start: 2, end: 3, content: ' f ' },
    ])).toEqual('a e  f d')
  })

  it('should accept input in any order', () => {
    expect(replacer('abcd', [
      { start: 2, end: 3, content: ' f ' },
      { start: 1, end: 2, content: ' e ' },
    ])).toEqual('a e  f d')
  })
})

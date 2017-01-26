import parse from '../../../src/css/parser';

describe('parse rules only', () => {
  it('parses normal rules', () => {
    const ast = parse`
      .class {
      }
    `

    expect(ast).toMatchSnapshot();
    expect(ast.rules[0].selector.value).toBe('.class');
  });

  it('parses multiple rules', () => {
    const ast = parse`
      .classA {}
      .classB {}
    `

    expect(ast).toMatchSnapshot();
    expect(ast.rules[0].selector.value).toBe('.classA');
    expect(ast.rules[1].selector.value).toBe('.classB');
  });

  it('parses nested rules', () => {
    const ast = parse`
      .outer {
        .inner {}
      }
    `

    expect(ast).toMatchSnapshot();
    expect(ast.rules[0].selector.value).toBe('.outer');
  });

  it('parses multiple nested rules', () => {
    const ast = parse`
      .outerA {
        .innerA {}
      }

      .outerB {
        .innerB {}
      }
    `

    expect(ast).toMatchSnapshot();
    expect(ast.rules[0].selector.value).toBe('.outerA');
    expect(ast.rules[1].selector.value).toBe('.outerB');
  });

  it('parses rules containing declarations', () => {
    const ast = parse`
      .class {
        text-align: center;
      }
    `

    expect(ast).toMatchSnapshot();
    expect(ast.rules[0].block.declarations[0].property.value).toBe('text-align');
    expect(ast.rules[0].block.declarations[0].value.value).toBe('center');
  });

  it('throws if closing paranthesis is missing', () => {
    expect(() => parse`
      .class {
        text-align: center;
    `).toThrow()
  });

  it('throws if closing paranthesis is missing', () => {
    expect(() => parse(`
      .classA {
        text-align: center;
        .classB {}
    `)).toThrow()
  });
});

import parse from '../../../src/css/parser';

describe('parse rules only', () => {
  it('parses normal rules', () => {
    const ast = parse`
      .class {
      }
    `

    expect(ast).toMatchSnapshot();
    expect(ast.rules[0].selector.value.trim()).toBe('.class');
  });

  it('parses multiple rules', () => {
    const ast = parse`
      .classA {}
      .classB {}
    `

    expect(ast).toMatchSnapshot();
    expect(ast.rules[0].selector.value.trim()).toBe('.classA');
    expect(ast.rules[1].selector.value.trim()).toBe('.classB');
  });

  it('parses nested rules', () => {
    const ast = parse`
      .outer {
        .inner {}
      }
    `

    expect(ast).toMatchSnapshot();
    expect(ast.rules[0].selector.value.trim()).toBe('.outer');
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
    expect(ast.rules[0].selector.value.trim()).toBe('.outerA');
    expect(ast.rules[1].selector.value.trim()).toBe('.outerB');
  });

  it('parses rules containing declarations', () => {
    const ast = parse`
      .class {
        text-align: center;
      }
    `

    expect(ast).toMatchSnapshot();
    expect(ast.rules[0].block.declarations[0].property.value.trim()).toBe('text-align');
    expect(ast.rules[0].block.declarations[0].value.value.trim()).toBe('center');
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

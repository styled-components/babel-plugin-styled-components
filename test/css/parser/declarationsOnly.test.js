import parse from '../../../src/css/parser';

describe('parse declarations only', () => {
  it('parses normal declarations', () => {
    expect(parse`
      color: red;
      text-align: center;
    `).toMatchSnapshot();
  });

  it('throws if semicolon is missing', () => {
    expect(() => parse`
      color: red;
      text-align: center
    `).toThrow();
  });

  it('throws if colon is missing', () => {
    expect(() => parse`
      color red;
      text-align: center;
    `).toThrow();
  });

  it('throws if property contains a whitespace', () => {
    expect(() => parse`
      color is: red;
      text-align: center;
    `).toThrow();
  });
});

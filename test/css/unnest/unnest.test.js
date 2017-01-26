import unnest from '../../../src/css/unnest';
import parse from '../../../src/css/parser';

describe('unnest', () => {
  it('should work on nested rules', () => {
    const ast = parse`
      color: red;
      background: blue;

      & > div {
        color: green;
      }
    `

    const unnested = unnest(ast)
    expect(unnested).toMatchSnapshot()
  })

  it('should work on nested rules containing pseudo selectors', () => {
    const ast = parse`
      color: red;
      background: blue;

      &:hover {
        color: green;
      }
    `

    const unnested = unnest(ast)
    expect(unnested).toMatchSnapshot()
  })
})

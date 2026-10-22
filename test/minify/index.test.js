import {
  stripLineComment,
  minifyRaw,
  minifyCooked,
  compressSymbols,
} from '../../src/minify'

import { makePlaceholder } from '../../src/css/placeholderUtils'

describe('minify utils', () => {
  describe('stripLineComment', () => {
    it('splits a line by potential comment starts and joins until one is an actual comment', () => {
      expect(stripLineComment('abc def//ghi//jkl')).toBe('abc def')
    })

    it('ignores comment markers that are inside strings', () => {
      expect(stripLineComment('abc def"//"ghi\'//\'jkl//the end')).toBe(
        'abc def"//"ghi\'//\'jkl'
      )
      expect(stripLineComment('abc def"//"')).toBe('abc def"//"')
    })

    it('ignores comment markers that are inside parantheses', () => {
      expect(stripLineComment('bla (//) bla//the end')).toBe('bla (//) bla')
    })

    it('ignores even unescaped URLs', () => {
      expect(stripLineComment('https://test.com// comment//')).toBe(
        'https://test.com'
      )
    })

    it('strips comments after a closing paren opened on a previous line', () => {
      expect(stripLineComment('    ); // long comment')).toBe('    ); ')
    })

    it('ignores comment markers inside parens that follow an unmatched closing paren', () => {
      expect(stripLineComment('  ), url(//cdn.example.com/x.png)')).toBe(
        '  ), url(//cdn.example.com/x.png)'
      )
    })
  })

  describe('minify(Raw|Cooked)', () => {
    it('Removes multi-line comments', () => {
      const input = 'this is a/* ignore me please */test'
      const expected = 'this is a test' // NOTE: They're replaced with newlines, and newlines are joined
      const [actual] = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(actual).toBe(minifyCooked(input)[0])
    })

    it('Joins all lines of code', () => {
      const input = 'this\nis\na/* ignore me \n please */\ntest'
      const expected = 'this is a test'
      const [actual] = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(actual).toBe(minifyCooked(input)[0])
    })

    it('Removes line comments filling an entire line', () => {
      const input = 'line one\n// remove this comment\nline two'
      const expected = 'line one line two'
      const [actual] = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(actual).toBe(minifyCooked(input)[0])
    })

    it('Removes line comments at the end of lines of code', () => {
      const input = 'valid line with // a comment\nout comments'
      const expected = 'valid line with  out comments'
      const [actual] = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(actual).toBe(minifyCooked(input)[0])
    })

    it('Preserves multi-line comments starting with /*!', () => {
      const input =
        'this is a /*! dont ignore me please */ test/* but you can ignore me */'
      const expected = 'this is a /*! dont ignore me please */ test'
      const [actual] = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(actual).toBe(minifyCooked(input)[0])
    })

    it('Returns the indices of removed placeholders (expressions)', () => {
      const placeholder1 = makePlaceholder(0)
      const placeholder2 = makePlaceholder(1)
      const input = `this is some\ninput with ${placeholder1} and // ignored ${placeholder2}`
      const expected = `this is some input with ${placeholder1} and `
      const [actual, indices] = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(indices).toEqual([1])
      expect(minifyCooked(input)).toEqual([actual, [1]])
    })

    it('Removes line comments after a multi-line value and keeps the following block', () => {
      const placeholder = makePlaceholder(0)
      const input = `grid-template-rows: auto auto minmax(\n  0,\n  1fr\n); // long comment\n\n${placeholder} {\n  color: red;\n}`
      const expected = `grid-template-rows:auto auto minmax( 0,1fr );${placeholder}{color:red;}`
      const [actual, indices] = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(indices).toEqual([])
      expect(minifyCooked(input)).toEqual([actual, []])
    })

    it('Removes line comments after a multi-line value with interpolations and keeps the next declaration', () => {
      const placeholder1 = makePlaceholder(0)
      const placeholder2 = makePlaceholder(1)
      const input = `max-height: calc(\n  ${placeholder1} + ${placeholder2}\n); // comment\ncolor: blue;`
      const expected = `max-height:calc( ${placeholder1} + ${placeholder2} );color:blue;`
      const [actual, indices] = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(indices).toEqual([])
      expect(minifyCooked(input)).toEqual([actual, []])
    })

    it('Removes line comments inside a multi-line value', () => {
      const input = 'width: calc(\n  10px // first\n  + 20px\n);\ncolor: blue;'
      const expected = 'width:calc( 10px  + 20px );color:blue;'
      const [actual] = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(actual).toBe(minifyCooked(input)[0])
    })

    it('Removes line comments filling an entire line inside a multi-line value', () => {
      const input =
        'grid-template-columns: repeat(\n  // three columns\n  3, 1fr\n);'
      const expected = 'grid-template-columns:repeat( 3,1fr );'
      const [actual] = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(actual).toBe(minifyCooked(input)[0])
    })

    it('Keeps comment markers inside parens and strings', () => {
      const input =
        'background: url(//cdn.example.com/x.png); // a\nbackground: url(http://example.com/x.png); // b\ncontent: "//not a comment"; // c\ncolor: red;'
      const expected =
        'background:url(//cdn.example.com/x.png);background:url(http://example.com/x.png);content:"//not a comment";color:red;'
      const [actual] = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(actual).toBe(minifyCooked(input)[0])
    })
  })

  describe('minifyRaw', () => {
    it('works with raw escape codes', () => {
      const input = 'this\\nis\\na/* ignore me \\n please */\\ntest'
      const expected = 'this is a test'
      const [actual] = minifyRaw(input)

      expect(actual).toBe(expected)
    })
  })

  describe('minifyCooked', () => {
    it('works with raw escape codes', () => {
      const input = 'this\\nis\\na/* ignore me \\n please */\\ntest'
      const expected = 'this\\nis\\na \\ntest'
      const [actual] = minifyCooked(input)

      expect(actual).toBe(expected)
    })
  })

  describe('compressSymbols', () => {
    it('removes spaces around symbols', () => {
      // The whitespace preceding the colon is removed here as part of the
      // trailing whitespace on the semi-colon. Contrast to the "preserves"
      // test below.
      const input = ';  :  {  }  ,  ;  '
      const expected = ';:{},;'

      expect(compressSymbols(input)).toBe(expected)
    })

    it('ignores symbols inside strings', () => {
      const input = ';   " : " \' : \' ;'
      const expected = ';" : " \' : \';'

      expect(compressSymbols(input)).toBe(expected)
    })

    it('preserves whitespace preceding colons', () => {
      const input = '& :last-child { color: blue; }'
      const expected = '& :last-child{color:blue;}'

      expect(compressSymbols(input)).toBe(expected)
    })
  })
})

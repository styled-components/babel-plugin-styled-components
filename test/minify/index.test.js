import {
  stripLineComment,
  minifyRaw,
  minifyCooked,
  compressSymbols
} from '../../src/minify'

describe('minify utils', () => {
  describe('stripLineComment', () => {
    it('splits a line by potential comment starts and joins until one is an actual comment', () => {
      expect(stripLineComment('abc def//ghi//jkl')).toBe('abc def')
    })

    it('ignores comment markers that are inside strings', () => {
      expect(stripLineComment('abc def"//"ghi\'//\'jkl//the end')).toBe('abc def"//"ghi\'//\'jkl')
      expect(stripLineComment('abc def"//"')).toBe('abc def"//"')
    })

    it('ignores comment markers that are inside parantheses', () => {
      expect(stripLineComment('bla (//) bla//the end')).toBe('bla (//) bla')
    })

    it('ignores even unescaped URLs', () => {
      expect(stripLineComment('https://test.com// comment//')).toBe('https://test.com')
    })
  })

  describe('minify(Raw|Cooked)', () => {
    it('Removes multi-line comments', () => {
      const input = 'this is a/* ignore me please */test'
      const expected = 'this is a test' // NOTE: They're replaced with newlines, and newlines are joined
      const actual = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(actual).toBe(minifyCooked(input))
    })

    it('Joins all lines of code', () => {
      const input = 'this\nis\na/* ignore me \n please */\ntest'
      const expected = 'this is a test'
      const actual = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(actual).toBe(minifyCooked(input))
    })

    it('Removes line comments filling an entire line', () => {
      const input = 'line one\n// remove this comment\nline two'
      const expected = 'line one line two'
      const actual = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(actual).toBe(minifyCooked(input))
    })

    it('Removes line comments at the end of lines of code', () => {
      const input = 'valid line with // a comment\nout comments'
      const expected = 'valid line with  out comments'
      const actual = minifyRaw(input)

      expect(actual).toBe(expected)
      expect(actual).toBe(minifyCooked(input))
    })
  })

  describe('minifyRaw', () => {
    it('works with raw escape codes', () => {
      const input = 'this\\nis\\na/* ignore me \\n please */\\ntest'
      const expected = 'this is a test'
      const actual = minifyRaw(input)

      expect(minifyRaw(input)).toBe(expected)

      // NOTE: This is just a sanity check
      expect(minifyCooked(input)).toBe('this\\nis\\na \\ntest')
    })
  })

  describe('compressSymbols', () => {
    it('removes spaces around symbols', () => {
      const input = ';  :  {  }  ,  ;  '
      const expected = ';:{},;'

      expect(compressSymbols(input)).toBe(expected)
    })

    it('ignores symbols inside strings', () => {
      const input = ';   " : " \' : \' ;'
      const expected = ';" : " \' : \';'

      expect(compressSymbols(input)).toBe(expected)
    })
  })
})

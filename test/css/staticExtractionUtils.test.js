import {
  parseSelector,
  parseRules,
  assembleStaticAndDynamic
} from '../../src/css/staticExtractionUtils'

describe('static extraction utilities', () => {
  describe('parseSelector', () => {
    it('parses the selector of a css string', () => {
      expect(parseSelector('selector{}')).toBe('selector')
      expect(parseSelector('  selector     {}')).toBe('selector')
    })
  })

  describe('parseRules', () => {
    it('parses the rules of a css string', () => {
      const input = 'selector { a: b; c: d; e: f; }'
      expect(parseRules(input)).toEqual([
        'a: b',
        'c: d',
        'e: f'
      ])
    })
  })

  describe('assembleStaticAndDynamic', () => {
    it('splits rules into dynamic and static ones', () => {
      const input = [
        'a: b',
        'c: d',
        'test: __PLACEHOLDER_1__',
        'e: f',
        'test2: __PLACEHOLDER_2__'
      ]

      expect(assembleStaticAndDynamic(input)).toEqual({
        static: [
          'a: b',
          'c: d',
          'e: f'
        ],
        dynamic: [
          'test: __PLACEHOLDER_1__',
          'test2: __PLACEHOLDER_2__'
        ]
      })
    })
  })
})

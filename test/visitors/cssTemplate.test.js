import {
  templateCss,
} from '../../src/visitors/cssTemplate'

describe('css template functions', () => {
  describe('templateCss', () => {
    it('replace {css} in the template with the original css', () => {
      expect(templateCss('abc {css} ghi', 'def')).toBe('abc def ghi')
    })

    it('replace the first instance of {css} in the template and remove additional', () => {
      expect(templateCss('abc {css} {css} ghi {css}', 'def')).toBe('abc def  ghi ')
    })

    it('if there is no {css} in the template return the original css', () => {
      expect(templateCss('abc ghi', 'def')).toBe('def')
    })
  })
})

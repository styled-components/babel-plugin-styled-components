import {
  temporaryClassname,
  containsPlaceholders
} from './placeholderUtils'

// Parses the selector from a stylis css partial
export const parseSelector = str => (
  str.slice(0, str.indexOf('{')).trim()
)

export const parseRules = str => {
  const start = str.indexOf('{')
  const end = str.indexOf('}')
  const rawRules = str.slice(start + 1, end - 1)

  return rawRules
    .split(';')
    .reduce((acc, x) => {
      const rule = x.trim()
      if (rule) {
        acc.push(rule)
      }

      return acc
    }, [])
}

export const assembleStaticAndDynamic = rules => {
  const { s, d } = rules
    .reduce((acc, rule) => {
      const _containsPlaceholders = containsPlaceholders(rule)
      acc[_containsPlaceholders ? 'd' : 's'].push(rule)
      return acc
    }, {
      s: [], // static
      d: []  // dynamic
    })

  return {
    static: s.join(';'),
    dynamic: d.join(';')
  }
}

const makeExtractionMiddleware = (componentId, styleSheet) => (ctx, str, _, __, namespace) => {
  if (
    // NOTE: These two codes receive all compiled css blocks
    (ctx === 3 || ctx === 4) &&
    namespace === temporaryClassname
  ) {
    const selector = parseSelector(str)

    // NOTE: If the selector is dynamic, the entire block is dynamic
    if (containsPlaceholders(selector)) {
      return
    }

    const rules = parseRules(str)
    const groupedRules = assembleStaticAndDynamic(rules)
    const staticSelector = selector.replace(temporaryClassname, `.${componentId}`)

    // Save rules to global object
    let _staticRules = []
    if (styleSheet.has(staticSelector)) {
      _staticRules = styleSheet.get(staticSelector)
    }

    _staticRules = _staticRules.concat(groupedRules.static)
    styleSheet.set(staticSelector, _staticRules)

    // Remove block if no dynamic rules are left
    if (!groupedRules.dynamic.length) {
      return ''
    }

    return `${selector} {${groupedRules.dynamic}}`
  }
}

export default makeExtractionMiddleware

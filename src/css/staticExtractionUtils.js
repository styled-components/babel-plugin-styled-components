import {
  temporaryClassname,
  containsPlaceholders
} from './placeholderUtils'

// Parses the selector from a stylis css partial
const parseSelector = str => (
  str.slice(0, str.indexOf('{')).trim()
)

const parseRules = str => {
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

const assembleStaticAndDynamic = rules => {
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

export const staticStyleSheet = {}

const makeExtractionMiddleware = componentId => (ctx, str, _, __, namespace) => {
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
    if (!staticStyleSheet[staticSelector]) {
      staticStyleSheet[staticSelector] = groupedRules.static
    } else {
      staticStyleSheet[staticSelector] = staticStyleSheet[staticSelector]
        .concat(groupedRules.static)
    }

    // Remove block if no dynamic rules are left
    if (!groupedRules.dynamic.length) {
      return ''
    }

    return `${selector} {${groupedRules.dynamic}}`
  }
}

export default makeExtractionMiddleware

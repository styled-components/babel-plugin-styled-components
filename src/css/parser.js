import {
  findToken,
  findClosingParanthesis
} from './utils/parsingUtils'

export const selectorNode = (css, start, end) => ({
  type: 'SelectorLiteral',
  loc: [start, end],
  value: css.slice(start, end).trim()
})

export const propertyNode = (css, start, end) => {
  const value = css.slice(start, end).trim()

  if (value.includes(';')) {
    throw new Error(`Unexpected token! Properties cannot contain ';'.`)
  } else if (/\s/g.test(value)) {
    throw new Error(`Unexpected token! Properties cannot contain whitespaces.`)
  }

  return {
    type: 'PropertyLiteral',
    loc: [start, end],
    value
  }
}

export const valueNode = (css, start, end) => ({
  type: 'ValueLiteral',
  loc: [start, end],
  value: css.slice(start, end).trim()
})

// Parses a declaration of the form `property: value`
export const declarationNode = (css, start, separator, end) => ({
  type: 'Declaration',
  loc: [start, end],
  property: propertyNode(css, start, separator),
  value: valueNode(css, separator + 1, end)
})

// Parses a rule of the form `selector { body }`
export const ruleNode = (css, start, separator, end) => ({
  type: 'Rule',
  loc: [start, end],
  selector: selectorNode(css, start, separator - 1),
  block: blockNode(css, separator + 1, end - 1)
})

export const blockNode = (css, start, end) => {
  let _start = start
  let index = start

  const declarations = []
  const rules = []

  while (index <= end) {
    const token = css[index]

    if (token === '{') {
      const _end = findClosingParanthesis(css, index + 1, end)
      rules.push(ruleNode(css, _start, index, _end))

      index = _start = _end + 1
    } else if (token === ':') {
      const _end = findToken(css, ';', index, end)
      declarations.push(declarationNode(css, _start, index, _end))

      index = _start = _end + 1
    } else {
      index++
    }
  }

  return {
    type: 'Block',
    loc: [start, end],
    declarations,
    rules
  }
}

const parse = css => {
  return blockNode(css, 0, css.length - 1)
}

export default parse

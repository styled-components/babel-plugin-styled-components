import {
  findToken,
  findClosingParanthesis,
  filterNodesForLocation
} from './utils/parsingUtils'

export const interpolationNode = (babelNode, loc) => ({
  type: 'Interpolation',
  loc: [loc, loc],
  babelNode
})

export const selectorNode = (css, interpolations, start, end) => ({
  type: 'SelectorLiteral',
  loc: [start, end],
  value: css.slice(start, end).trim()
})

export const propertyNode = (css, interpolations, start, end) => {
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

export const valueNode = (css, interpolations, start, end) => ({
  type: 'ValueLiteral',
  loc: [start, end],
  value: css.slice(start, end).trim()
})

// Parses a declaration of the form `property: value`
export const declarationNode = (css, interpolations, start, separator, end) => ({
  type: 'Declaration',
  loc: [start, end],
  property: propertyNode(
    css,
    filterNodesForLocation(interpolations, start, separator),
    start,
    separator
  ),
  value: valueNode(
    css,
    filterNodesForLocation(interpolations, separator + 1, end),
    separator + 1,
    end
  )
})

// Parses a rule of the form `selector { body }`
export const ruleNode = (css, interpolations, start, separator, end) => ({
  type: 'Rule',
  loc: [start, end],
  selector: selectorNode(
    css,
    filterNodesForLocation(interpolations, start, separator - 1),
    start,
    separator - 1
  ),
  block: blockNode(
    css,
    filterNodesForLocation(interpolations, separator + 1, end - 1),
    separator + 1,
    end - 1
  )
})

export const blockNode = (css, interpolations, start, end) => {
  let _start = start
  let index = start

  const declarations = []
  const rules = []

  while (index <= end) {
    const token = css[index]

    if (token === '{') {
      const _end = findClosingParanthesis(css, index + 1, end)

      rules.push(ruleNode(
        css,
        filterNodesForLocation(interpolations, _start, _end),
        _start,
        index,
        _end
      ))

      index = _start = _end + 1
    } else if (token === ':') {
      const _end = findToken(css, ';', index, end)

      declarations.push(declarationNode(
        css,
        filterNodesForLocation(interpolations, _start, _end),
        _start,
        index,
        _end
      ))

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

// Takes an array of CSS strings and Babel AST Nodes of interpolations
const parse = (cssArr, ...nodes) => {
  const interpolations = []
  let css = ''

  for (let i = 0; i < cssArr.length; i++) {
    css += cssArr[i]

    const loc = css.length
    const node = nodes[i]

    interpolations.push(interpolationNode(node, loc))
  }

  return blockNode(css, interpolations, 0, css.length - 1)
}

export default parse

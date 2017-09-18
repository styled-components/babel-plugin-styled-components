import Stylis from 'stylis'

const stylis = new Stylis({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: true,
})

let replacements

const beginning = expr =>
  expr.startsWith('$props') ? `\${props => ` :
    expr.startsWith('$theme') ? `\${props => props.` :
      `\${`

stylis.use((context, content, selectors, parent, line, column, length) => {
  //console.log([context, content, selectors, parent, line, column, length])
  if (context !== 1) return
  let new_content

  if (content.startsWith('$')) {
    new_content = `\${ ${content.slice(1) } }`
  } else {
    const match = content.match(/\s\$[\w.]+(\s|$)/)
    if (match) {
      const before_dollar = content.slice(0, match.index + 1)
      const after_dollar = content.slice(match.index + 1)
      //console.log({ before_dollar, after_dollar })
      const tokens = after_dollar.split(/\s+/)
      //console.log(tokens)
      const expr_start = beginning(after_dollar)

      let ended = false
      let token
      let mode = 'TOKEN'
      const expr_tokens = []
      while (!ended && (token = tokens.shift())) {
        //console.log(mode, token)
        if (mode === 'TOKEN') {
          if (token.startsWith('$')) {
            expr_tokens.push(token.slice(1))
            mode = 'OPERATOR'
          } else if (token.startsWith(`'`) || token.startsWith(`"`)) {
            expr_tokens.push(token)
            mode = 'QUOTE'
          } else {
            expr_tokens.push(`'${token}'`)
            mode = 'OPERATOR'
          }
        } else if (mode === 'OPERATOR') {
          if (token === '||' || token === '?' || token === ':') {
            expr_tokens.push(token)
            mode = 'TOKEN'
          } else {
            tokens.unshift(token)
            ended = true
          }
        } else if (mode === 'QUOTE') {
          expr_tokens.push(token)
          if (token.endsWith(`'`) || token.endsWith(`"`)) {
            mode = 'OPERATOR'
          }
        }
      }
      if (expr_tokens.length > 0) {
        new_content = `${before_dollar}${expr_start}${expr_tokens.join(' ')}}${tokens.length > 0 ? ' ' + tokens.join(' ') : ''}`
      }
    }

  }

  if (new_content) {
    replacements.push({
      from: column - content.length - 1,
      to: column - 1,
      content: new_content
    })
  }
})

const report = str => {
  let sum = 0
  console.log(str.split(/\n/g).map((l, i) => `${sum++}—${(sum += l.length) - 1}: ${JSON.stringify(l)}`).join('\n'))
}

export const replacer = (str, replacements) => {
  let output = str
  let offset = 0

  replacements
    .sort((a, b) => a.start > b.start)
    .forEach(({ start, end, content }) => {
      const length = end - start
      output = `${output.slice(0,start + offset)}${content}${output.slice(end + offset)}`
      offset += content.length - length
    })
  return output
}

export default str => {
  replacements = []
  const flat_str = str.replace(/\n/g, ' ')
  const brackets = []
  flat_str.replace(/[{}]/g, (match, bracket_index) => {
    if (match === '{') brackets.push(bracket_index)
    else {
      const matching_brace = brackets.pop()
      if (!matching_brace) return // bad input ignore
      const string_up_to_opening = flat_str.slice(0, matching_brace)
      console.log(string_up_to_opening)
      const one_of_ours = string_up_to_opening.match(/(\$[\w.]+)\?\s+$/)
      if (one_of_ours) {
        const { 1: expr, index } = one_of_ours
        console.log({ expr, index })
        replacements.push({
          from: index,
          to: matching_brace + 1,
          content: `${beginning(expr)}${expr.slice(1)} && css\``
        })
        replacements.push({
          from: bracket_index,
          to: bracket_index + 1,
          content: `\`}`
        })
      }
    }
    return match
  })
  stylis('', flat_str)
  let output = str
  let offset = 0
  console.log(replacements.sort((a, b) => a.from > b.from))
  replacements
    .sort((a, b) => a.from > b.from)
    .forEach(({ from, to, content }) => {
      report(output)
      const diff = content.length - (to - from)
      console.log({ from, to, content, content_length: content.length, offset, diff })
      const a = output.slice(0, from + offset)
      const b = output.slice(to + offset)
      console.log([a, content, b])
      output = `${a}${content}${b}`
      offset += diff
    })
  report(output)
  return output
}

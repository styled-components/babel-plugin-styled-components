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
stylis.use((context, content, selectors, parent, line, column, length) => {
  console.log([context, content, selectors, parent, line, column, length])
  if (context !== 1) return
  let new_content

  if (content.startsWith('$')) {
    new_content = `\${ ${content.slice(1) } }`
  } else {
    const match = content.match(/\s\$[\w.]+(\s|$)/)
    if (match) {
      console.log(match)
      const before_dollar = content.slice(0, match.index + 1)
      const after_dollar = content.slice(match.index + 1)
      console.log({ before_dollar, after_dollar })
      const tokens = after_dollar.split(/\s+/)
      console.log(tokens)

      const beginning = after_dollar.startsWith('$props') ? `\${props => `
        : after_dollar.startsWith('$theme') ? `\${props => props.`
          : `\${`

      let ended = false
      let token
      let mode = 'token'
      const expr_tokens = []
      while (!ended && (token = tokens.shift())) {
        console.log(mode, token)
        if (mode === 'token') {
          if (token.startsWith('$')) {
            expr_tokens.push(token.slice(1))
            mode = 'operator'
          } else if (token.startsWith(`'`) || token.startsWith(`"`)) {
            console.log("eh?")
            expr_tokens.push(token)
            mode = 'quote'
          } else {
            expr_tokens.push(`'${token}'`)
            mode = 'operator'
          }
        } else if (mode === 'operator') {
          if (token === '||') {
            expr_tokens.push(token)
            mode = 'token'
          } else {
            ended = true
          }
        } else if (mode === 'quote') {
          expr_tokens.push(token)
          if (token.endsWith(`'`) || token.endsWith(`"`)) {
            mode = 'operator'
          }
        }
      }
      if (expr_tokens.length > 0) {
        new_content = `${before_dollar}${beginning}${expr_tokens.join(' ')}}${tokens.join(' ')}`
      }
    }

  }

  if (new_content) {
    let eh = {
      from: column - content.length - 1,
      to: column - 1,
      content: new_content
    }
    console.log(eh)
    replacements.push(eh)
  }
})

export default str => {
  replacements = []
  stylis('', str.replace(/\n/g, ' '))
  let output = str
  let offset = 0
  console.log(replacements)
  replacements.forEach(({ from, to, content }) => {
    const diff = content.length - (to - from) + 1
    console.log(JSON.stringify(output))
    console.log({ from, to, content, offset })
    console.log(from + offset, to + offset)
    output = `${output.slice(0, from + offset)}${content}${output.slice(to + offset)}`
    console.log(JSON.stringify(output))
    offset += diff
  })
  return output
}

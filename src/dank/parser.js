import Stylis from 'stylis'
const stylis = new Stylis({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: true,
})

stylis.use((context, content, selectors, parent, line, column, length) => {
  console.log([context, content, selectors, parent, line, column, length])
  if (context !== 1) return
  const dollar_index = content.indexOf('$')

  if (dollar_index === -1) {
    return
  } else if (dollar_index === 0) {
    return `\${ ${content} }`
  } else {
    const before_dollar = content.substring(0, dollar_index)
    const after_dollar = content.substring(dollar_index + 1, content.length)
    const tokens = after_dollar.split(/\s+/)

    const beginning =  after_dollar.startsWith('props') ? `\${props => `
      : after_dollar.startsWith('theme') ? `\${props => props.`
      : `\${`

    let ended = false
    let token
    const expr_tokens = []
    while (!ended && (token = tokens.shift())) {
      if (expr_tokens.length === 0) {
        expr_tokens.push(token)
      } else {

      }
    }
    console.log([before_dollar, beginning, expr_tokens, tokens])
    return `${before_dollar}${beginning}${expr_tokens.join(' ')}}${tokens.join(' ')}`
  }
})

export default str => {
  const parsed = stylis('',str)
  return parsed.substring(1, parsed.length - 1)
}

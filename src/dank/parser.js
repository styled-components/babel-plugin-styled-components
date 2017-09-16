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
  const dollar_index = content.indexOf('$')
  let new_content

  if (dollar_index === -1) {
    return
  } else if (dollar_index === 0) {
    new_content = `\${ ${content.slice(1) } }`
  } else {
    const before_dollar = content.slice(0, dollar_index)
    const after_dollar = content.slice(dollar_index + 1)
    console.log({before_dollar, after_dollar})
    const tokens = after_dollar.split(/\s+/)

    const beginning = after_dollar.startsWith('props') ? `\${props => `
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
    new_content = `${before_dollar}${beginning}${expr_tokens.join(' ')}}${tokens.join(' ')}`
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
    const diff = (to - from) - content.length
    console.log(JSON.stringify(output))
    output = `${output.slice(0, from + offset)}${content}${output.slice(to + offset)}`
    console.log(JSON.stringify(output))
    offset += diff
  })
  return output
}

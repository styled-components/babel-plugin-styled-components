class Or {
  constructor() {
    this.ended = false

  }

  next(token) {

  }
}

class Start {
  constructor(token) {
    this.ended = false
    this.token = token
  }

  next(token) {
    if (token === ';') this.ended = true
    else if (token === '||') {
      return new Or(this)
    }
    return this
  }

  toString() {
    const no_dollar = this.token.substr(1, this.token.length - 1)
    if (no_dollar.startsWith('$props')) {
      return `\${props => ${no_dollar}}`
    } else if (no_dollar.startsWith('theme')) {
      return `\${props => props.${no_dollar}}`
    } else {
      return `\${${no_dollar}}`
    }
  }
}

export default str => {
  let current_expression = null

  return str.replace(/[\w$.:|{}?]+(?=[\s;])|;|\s\?\s/gm, token => {
    //console.log({ token, current_expression })
    if (current_expression === null) {
      if (token.startsWith('$')) {
        current_expression = new Start(token)
      } else {
        return token
      }
    } else {
      current_expression = current_expression.next(token)

      if (current_expression.ended) {
        const output = current_expression.toString() + token
        current_expression = null
        return output
      }
    }
    return ''
  })
}

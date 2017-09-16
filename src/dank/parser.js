class Or {
  constructor(lhs) {
    this.lhs = lhs
    this.ended = false
    this.contents = ''
  }

  next(token) {
    console.log(this.contents)
    console.log(token)
    if (this.contents === null && !token.startsWith(`'`) && !token.startsWith(`"`)) {
      this.contents = `'${token}'`
    } else {
      this.contents = `${this.contents}${token}`
    }
    if (
      (this.contents.startsWith(`'`) && !this.contents.endsWith(`'`))
    ||
      (this.contents.startsWith(`"`) && !this.contents.endsWith(`"`))
    ) {
      // keep consuming
      return this
    } else {
      return new Start(`${this.lhs.token} || ${this.contents}`)
    }
  }

  toString() {
    return this.lhs.toString(`|| ${this.contents}`)
  }
}

class Start {
  constructor(token) {
    this.ended = false
    this.token = token
  }

  next(token) {
    if (token.match(/^\s+$/)) {}
    else if (token === ';') this.ended = true
    else if (token === '||') {
      return new Or(this)
    }
    return this
  }

  toString() {
    const no_dollar = this.token.substr(1, this.token.length - 1)
    if (no_dollar.startsWith('props')) {
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

  return str.replace(/[\w$.:|{}?'"]+(?=[\s;])|;|\s+/gm, token => {
    console.log({ token, current_expression })
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

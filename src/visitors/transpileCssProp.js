// Most of this code was taken from @satya164's babel-plugin-css-prop
// @see https://github.com/satya164/babel-plugin-css-prop
import { useCssProp } from '../utils/options'

const getName = (node, t) => {
  if (typeof node.name === 'string') return node.name
  if (t.isJSXMemberExpression(node)) {
    return `${getName(node.object, t)}.${node.property.name}`
  }
  throw path.buildCodeFrameError(
    `Cannot infer name from node with type "${
      node.type
    }". Please submit an issue at github.com/styled-components/babel-plugin-styled-components with your code so we can take a look at your use case!`
  )
}

export default t => (path, state) => {
  if (!useCssProp(state)) return
  if (path.node.name.name !== 'css') return

  // Insert require('styled-components') if it doesn't exist yet
  const { bindings } = path.findParent(p => p.type === 'Program').scope
  if (!state.required) {
    if (!bindings.styled) {
      state.items.push(
        t.importDeclaration(
          [t.importDefaultSpecifier(t.identifier('styled'))],
          t.stringLiteral('styled-components')
        )
      )
    }
    state.required = true
  }

  const elem = path.parentPath
  const name = getName(elem.node.name, t)
  const id = path.scope.generateUidIdentifier(
    'Styled' + name.replace(/^([a-z])/, (match, p1) => p1.toUpperCase())
  )

  const styled = t.callExpression(t.identifier('styled'), [
    /^[a-z]/.test(name) ? t.stringLiteral(name) : t.identifier(name),
  ])

  let css

  if (t.isStringLiteral(path.node.value)) {
    css = t.templateLiteral(
      [t.templateElement({ raw: path.node.value.value }, true)],
      []
    )
  } else if (t.isJSXExpressionContainer(path.node.value)) {
    if (t.isTemplateLiteral(path.node.value.expression)) {
      css = path.node.value.expression
    } else if (
      t.isTaggedTemplateExpression(path.node.value.expression) &&
      path.node.value.expression.tag.name === 'css'
    ) {
      css = path.node.value.expression.quasi
    } else {
      css = t.templateLiteral(
        [
          t.templateElement({ raw: '' }, false),
          t.templateElement({ raw: '' }, true),
        ],
        [path.node.value.expression]
      )
    }
  }

  if (!css) return

  elem.node.attributes = elem.node.attributes.filter(attr => attr !== path.node)
  elem.node.name = t.jSXIdentifier(id.name)

  if (elem.parentPath.node.closingElement) {
    elem.parentPath.node.closingElement.name = t.jSXIdentifier(id.name)
  }

  css.expressions = css.expressions.reduce((acc, ex) => {
    if (
      Object.entries(bindings).some(([, b] /*: any */) =>
        b.referencePaths.find(p => p.node === ex)
      ) ||
      t.isFunctionExpression(ex) ||
      t.isArrowFunctionExpression(ex)
    ) {
      acc.push(ex)
    } else {
      const name = path.scope.generateUidIdentifier(`_$p_`)
      const p = t.identifier('p')

      elem.node.attributes.push(
        t.jSXAttribute(t.jSXIdentifier(name.name), t.jSXExpressionContainer(ex))
      )

      acc.push(t.arrowFunctionExpression([p], t.memberExpression(p, name)))
    }

    return acc
  }, [])

  state.items.push(
    t.variableDeclaration('var', [
      t.variableDeclarator(id, t.taggedTemplateExpression(styled, css)),
    ])
  )
}

import { useCssProp } from '../utils/options'

export default t => (path, state) => {
  if (!useCssProp(state)) return
  if (path.node.name.name !== 'css') return

  // Insert require('styled-components') if it doesn't exist yet
  const { bindings } = path.findParent(p => p.type === 'Program').scope
  if (!state.required) {
    if (!bindings.styled) {
      state.items.push(
        t.variableDeclaration('var', [
          t.variableDeclarator(
            t.identifier('styled'),
            t.callExpression(t.identifier('require'), [
              t.stringLiteral('styled-components'),
            ])
          ),
        ])
      )
    }
    state.required = true
  }

  const elem = path.parentPath
  const id = path.scope.generateUidIdentifier(
    'CSS' +
      elem.node.name.name.replace(/^([a-z])/, (match, p1) => p1.toUpperCase())
  )

  const tag = elem.node.name.name
  const styled = t.callExpression(t.identifier('styled'), [
    /^[a-z]/.test(tag) ? t.stringLiteral(tag) : t.identifier(tag),
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
  elem.node.name.name = id.name

  if (elem.parentPath.node.closingElement) {
    elem.parentPath.node.closingElement.name.name = id.name
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

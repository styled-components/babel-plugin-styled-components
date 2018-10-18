import syntax from '@babel/plugin-syntax-jsx'
import pureAnnotation from './visitors/pure'
import minify from './visitors/minify'
import displayNameAndId from './visitors/displayNameAndId'
import templateLiterals from './visitors/templateLiterals'
import assignStyledRequired from './visitors/assignStyledRequired'

export default function({ types: t }) {
  return {
    inherits: syntax,
    visitor: {
      // These visitors insert newly generated code and missing import/require statements
      Program: {
        enter(path, state) {
          state.required = false
          state.items = []
        },
        exit(path, state) {
          path.node.body.push(...state.items)
        },
      },
      JSXAttribute(path, state) {
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
            elem.node.name.name.replace(/^([a-z])/, (match, p1) =>
              p1.toUpperCase()
            )
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

        elem.node.attributes = elem.node.attributes.filter(
          attr => attr !== path.node
        )
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
              t.jSXAttribute(
                t.jSXIdentifier(name.name),
                t.jSXExpressionContainer(ex)
              )
            )

            acc.push(
              t.arrowFunctionExpression([p], t.memberExpression(p, name))
            )
          }

          return acc
        }, [])

        state.items.push(
          t.variableDeclaration('var', [
            t.variableDeclarator(id, t.taggedTemplateExpression(styled, css)),
          ])
        )
      },
      CallExpression(path, state) {
        displayNameAndId(t)(path, state)
        pureAnnotation(t)(path, state)
      },
      TaggedTemplateExpression(path, state) {
        minify(t)(path, state)
        displayNameAndId(t)(path, state)
        templateLiterals(t)(path, state)
        pureAnnotation(t)(path, state)
      },
      VariableDeclarator(path, state) {
        assignStyledRequired(t)(path, state)
      },
    },
  }
}

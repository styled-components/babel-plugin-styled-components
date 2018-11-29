import syntax from 'babel-plugin-syntax-jsx'
import pureAnnotation from './visitors/pure'
import minify from './visitors/minify'
import displayNameAndId from './visitors/displayNameAndId'
import templateLiterals from './visitors/templateLiterals'
import assignStyledRequired from './visitors/assignStyledRequired'
import transpileCssProp from './visitors/transpileCssProp'

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
          const oldLength = path.node.body.length

          path.node.body.push(...state.items)

          const newLength = path.node.body.length

          for (let i = 0; i < newLength - oldLength; i++) {
            // Queue all inserted items for revisiting so that tagged templates are transpiled
            path.requeue(path.get('body')[oldLength + i]);
          }
        },
      },
      JSXAttribute(path, state) {
        transpileCssProp(t)(path, state)
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

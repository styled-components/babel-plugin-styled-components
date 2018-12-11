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

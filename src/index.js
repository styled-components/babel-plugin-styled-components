import minify from './visitors/minify'
import desugarStyled from './visitors/desugarStyled'
import displayNameAndId from './visitors/displayNameAndId'
import templateLiterals from './visitors/templateLiterals'
import assignStyledRequired from './visitors/assignStyledRequired'
import rewriteStyledImport from './visitors/rewriteStyledImport'

export default function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        rewriteStyledImport(t)(path, state)
      },
      MemberExpression(path, state) {
        desugarStyled(t)(path, state)
      },
      TaggedTemplateExpression(path, state) {
        minify(t)(path, state)
        displayNameAndId(t)(path, state)
        templateLiterals(t)(path, state)
      },
      VariableDeclarator(path, state) {
        assignStyledRequired(t)(path, state)
      },
    },
  }
}

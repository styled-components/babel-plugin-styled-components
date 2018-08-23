import minify from './visitors/minify'
import desugarStyled from './visitors/desugarStyled'
import displayNameAndId from './visitors/displayNameAndId'
import templateLiterals from './visitors/templateLiterals'
import assignStyledRequired from './visitors/assignStyledRequired'
import rewriteStyledImport from './visitors/rewriteStyledImport'

export default function({ types }) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        rewriteStyledImport(types)(path, state)
      },
      MemberExpression(path, state) {
        desugarStyled(types)(path, state)
      },
      TaggedTemplateExpression(path, state) {
        minify(types)(path, state)
        displayNameAndId(types)(path, state)
        templateLiterals(types)(path, state)
      },
      VariableDeclarator(path, state) {
        assignStyledRequired(types)(path, state)
      },
    },
  }
}

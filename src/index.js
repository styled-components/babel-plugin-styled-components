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
        rewriteStyledImport(path, state)
      },
      MemberExpression(path, state) {
        desugarStyled(path, state)
      },
      TaggedTemplateExpression(path, state) {
        minify(path, state)
        displayNameAndId(path, state)
        templateLiterals(path, state)
      },
      VariableDeclarator(path, state) {
        assignStyledRequired(path, state)
      },
    },
  }
}

import uglifyPure from './visitors/uglifyPure'
import minify from './visitors/minify'
import desugarStyled from './visitors/desugarStyled'
import displayNameAndId from './visitors/displayNameAndId'
import templateLiterals from './visitors/templateLiterals'
import assignStyledRequired from './visitors/assignStyledRequired'
import {
  noParserImportDeclaration,
  noParserRequireCallExpression,
} from './visitors/noParserImport'

export default function({ types: t }) {
  return {
    visitor: {
      MemberExpression(path, state) {
        desugarStyled(path, state)
      },
      ImportDeclaration(path, state) {
        noParserImportDeclaration(path, state)
      },
      CallExpression(path, state) {
        uglifyPure(path, state)
        noParserRequireCallExpression(path, state)
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

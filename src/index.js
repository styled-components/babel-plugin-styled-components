import minify from './visitors/minify'
import displayNameIdAndNamespace from './visitors/displayNameIdAndNamespace'
import templateLiterals from './visitors/templateLiterals'
import assignStyledRequired from './visitors/assignStyledRequired'
import { noParserImportDeclaration, noParserRequireCallExpression } from './visitors/noParserImport'

export default function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        noParserImportDeclaration(path, state)
      },
      CallExpression(path, state) {
        noParserRequireCallExpression(path, state)
      },
      TaggedTemplateExpression(path, state) {
        minify(path, state)
        displayNameIdAndNamespace(path, state)
        templateLiterals(path, state)
      },
      VariableDeclarator(path, state) {
        assignStyledRequired(path, state)
      }
    }
  }
}

import uglifyPure from './visitors/uglifyPure'
import minify from './visitors/minify'
import displayNameAndId from './visitors/displayNameAndId'
import templateLiterals from './visitors/templateLiterals'
import cssTemplate from './visitors/cssTemplate'
import assignStyledRequired from './visitors/assignStyledRequired'
import { noParserImportDeclaration, noParserRequireCallExpression } from './visitors/noParserImport'


export default function({ types: t }) {
  return {
    visitor: {
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
        cssTemplate(path, state)
      },
      VariableDeclarator(path, state) {
        assignStyledRequired(path, state)
      }
    }
  }
}

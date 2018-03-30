import uglifyPure from './visitors/uglifyPure'
import minify from './visitors/minify'
import displayNameAndId from './visitors/displayNameAndId'
import templateLiterals from './visitors/templateLiterals'
import assignStyledRequired from './visitors/assignStyledRequired'
import { noParserImportDeclaration, noParserRequireCallExpression } from './visitors/noParserImport'

// Our visitors are factories that accept `types` and output a visitor function
// with the usual `path, state` signature.

export default function({ types }) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        noParserImportDeclaration(types)(path, state)
      },
      CallExpression(path, state) {
        uglifyPure(types)(path, state)
        noParserRequireCallExpression(types)(path, state)
      },
      TaggedTemplateExpression(path, state) {
        minify(types)(path, state)
        displayNameAndId(types)(path, state)
        templateLiterals(types)(path, state)
      },
      VariableDeclarator(path, state) {
        assignStyledRequired(types)(path, state)
      }
    }
  }
}

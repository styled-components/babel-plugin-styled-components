import annotateAsPure from "@babel/helper-annotate-as-pure"

import minify from './visitors/minify'
import displayNameAndId from './visitors/displayNameAndId'
import templateLiterals from './visitors/templateLiterals'
import assignStyledRequired from './visitors/assignStyledRequired'
import { noParserImportDeclaration, noParserRequireCallExpression } from './visitors/noParserImport'
import { useUglifyPure } from './utils/options'

export default function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        noParserImportDeclaration(path, state)
      },
      CallExpression(path, state) {
        if(useUglifyPure(state)){
          if(path.parent.type == 'VariableDeclarator' || path.parent.type == 'TaggedTemplateExpression'){
            annotateAsPure(path.node)
          }
        }
        noParserRequireCallExpression(path, state)
      },
      TaggedTemplateExpression(path, state) {
        minify(path, state)
        displayNameAndId(path, state)
        templateLiterals(path, state)
      },
      VariableDeclarator(path, state) {
        assignStyledRequired(path, state)
      }
    }
  }
}

import minify from './visitors/minify'
import displayNameAndId from './visitors/displayNameAndId'
import templateLiterals from './visitors/templateLiterals'
import { noParserImportDeclaration, noParserRequireCallExpression } from './visitors/noParserImport'
import { isStyled } from './utils/detectors'
import getComponentId from './utils/componentId'
import { staticStyleSheet } from './css/staticExtractionUtils'

export default function({ types: t }) {
  return {
    pre(state) {
      this.styleSheet = new Map()
    },
    visitor: {
      ImportDeclaration(path, state) {
        noParserImportDeclaration(path, state)
      },
      CallExpression(path, state) {
        noParserRequireCallExpression(path, state)
      },
      TaggedTemplateExpression(path, state) {
        let componentId = undefined
        if (isStyled(path.node.tag, state)) {
          componentId = getComponentId(state)
        }

        minify(path, state)
        displayNameAndId(path, state, componentId)
        templateLiterals(path, state, componentId, this.styleSheet)
      }
    },
    post(state) {
      console.log(this.styleSheet.entries())
    }
  }
}

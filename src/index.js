import path from 'path'
import fs from 'fs'
import { sync as mkdirpSync } from 'mkdirp'

import minify from './visitors/minify'
import displayNameAndId from './visitors/displayNameAndId'
import templateLiterals from './visitors/templateLiterals'
import { noParserImportDeclaration, noParserRequireCallExpression } from './visitors/noParserImport'
import { isStyled } from './utils/detectors'
import getComponentId from './utils/componentId'
import { useStaticExtraction } from './utils/options'
import reduceMap from './utils/reduceMap'

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
        const extractStaticPath = useStaticExtraction(state)
        if (extractStaticPath) {
          this.extractStaticPath = extractStaticPath
        }

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
      const { extractStaticPath } = this

      if (extractStaticPath) {
        const bundleFile = path.join(process.cwd(), extractStaticPath)

        const css = reduceMap(
          this.styleSheet,
          (acc, [ selector, rules ]) => {
            const partial = `${selector} {${rules.join(';')}}\n`
            return acc + partial
          },
          ''
        )

        mkdirpSync(path.dirname(bundleFile))
        fs.writeFileSync(bundleFile, css, { encoding: 'utf8' })
      }
    }
  }
}

import * as t from 'babel-types'
import { isStyled, isHelper } from '../utils/detectors'
import {
  useTranspileTemplateLiterals,
  usePreprocessTemplateLiterals
} from '../utils/options'

import interleave from 'styled-components/lib/utils/interleave'
import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested'

const CLASSNAME = '___CLASSNAME___'
const PLACEHOLDER = '___PLACEHOLDER___'

export default (path, state) => {
  if (
    isStyled(path.node.tag, state) ||
    isHelper(path.node.tag, state)
  ) {
    const { tag: callee, quasi: { quasis, expressions }} = path.node

    if (usePreprocessTemplateLiterals(state)) {
      const rawValues = quasis.map(quasi => quasi.value.cooked)
      const expressionPlaceholders = expressions.map(() => PLACEHOLDER)

      const css = interleave(rawValues, expressionPlaceholders).join('')
      const root = parse(`.${CLASSNAME} { ${css} }`)
      postcssNested(root)

      const unnestedCSS = root.toResult().css

      const values = t.arrayExpression(
        unnestedCSS
          .split(PLACEHOLDER)
          .map(value => t.stringLiteral(value))
      )

      path.replaceWith(t.callExpression(callee, [ values, ...expressions ]))
    } else if (useTranspileTemplateLiterals(state)) {
      const values = t.arrayExpression(quasis.map(quasi => t.stringLiteral(quasi.value.cooked)))
      path.replaceWith(t.callExpression(callee, [ values, ...expressions ]))
    }
  }
}

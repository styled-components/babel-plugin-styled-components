import * as t from 'babel-types'
import get from 'lodash/get'
import { isStyled } from '../utils/detectors'

export default (path, state) => {
  /**
   * Handles both "styled.div" and "styled_default.default.div" (transpiled output)
   */
  if (isStyled(path.node, state)) {
    /**
     * e.g. "div"
     */
    const sugar = get(path, 'node.property.name')

    /**
     * If the left side of the function is a complex path, e.g.
     * "styled_default.default.div", we want to preserve the "styled_default.default"
     * part and just reuse that AST object.
     */
    const leftSide = t.isMemberExpression(path.node.object)
      ? path.node.object
      : t.identifier(path.node.object.name)

    if (sugar) {
      /**
       * "styled.div" -> "styled('div')"
       */
      path.replaceWith(t.callExpression(leftSide, [t.stringLiteral(sugar)]))
    }
  }
}

import get from 'lodash/get'
import { isStyled } from '../utils/detectors'

export default types => (path, state) => {
  /**
   * Handles both "styled.div" and "styled_default.default.div" (transpiled output)
   */
  if (isStyled(types)(path.node, state)) {
    /**
     * e.g. "div"
     */
    const sugar = get(path, 'node.property.name')

    /**
     * If the left side of the function is a complex path, e.g.
     * "styled_default.default.div", we want to preserve the "styled_default.default"
     * part and just reuse that AST object.
     */
    const leftSide = types.isMemberExpression(path.node.object)
      ? path.node.object
      : types.identifier(path.node.object.name)

    if (sugar) {
      /**
       * "styled.div" -> "styled('div')"
       */
      path.replaceWith(
        types.callExpression(leftSide, [types.stringLiteral(sugar)])
      )
    }
  }
}

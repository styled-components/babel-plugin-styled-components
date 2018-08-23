import { isStyled, isHelper } from '../../utils/detectors'

export default types => (path, state) => {
  if (
    isStyled(types)(path.node.tag, state) ||
    isHelper(types)(path.node.tag, state)
  ) {
    const {
      tag: callee,
      quasi: { quasis, expressions },
    } = path.node

    const values = types.arrayExpression(
      quasis.map(quasi => types.stringLiteral(quasi.value.cooked))
    )

    path.replaceWith(types.callExpression(callee, [values, ...expressions]))
  }
}

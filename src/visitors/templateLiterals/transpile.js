import { isStyled, isHelper } from '../../utils/detectors'

export default t => (path, state) => {
  if (isStyled(t)(path.node.tag, state) || isHelper(t)(path.node.tag, state)) {
    const {
      tag: callee,
      quasi: { quasis, expressions },
    } = path.node

    const values = t.arrayExpression(
      quasis
        .filter(quasi => quasi.value.cooked !== undefined)
        .map(quasi => t.stringLiteral(quasi.value.cooked))
    )

    path.replaceWith(t.callExpression(callee, [values, ...expressions]))
  }
}

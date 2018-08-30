import { useMinify } from '../utils/options'
import { isStyled, isHelper } from '../utils/detectors'
import { minifyRawValues, minifyCookedValues } from '../minify'

export default t => (path, state) => {
  if (
    useMinify(state) &&
    (isStyled(t)(path.node.tag, state) || isHelper(t)(path.node.tag, state))
  ) {
    const templateLiteral = path.node.quasi
    const quasisLength = templateLiteral.quasis.length

    const [rawValuesMinified] = minifyRawValues(
      templateLiteral.quasis.map(x => x.value.raw)
    )

    const [
      cookedValuesMinfified,
      eliminatedExpressionIndices,
    ] = minifyCookedValues(templateLiteral.quasis.map(x => x.value.cooked))

    eliminatedExpressionIndices.forEach((expressionIndex, iteration) => {
      templateLiteral.expressions.splice(expressionIndex - iteration, 1)
    })

    for (let i = 0; i < quasisLength; i++) {
      const element = templateLiteral.quasis[i]

      element.value.raw = rawValuesMinified[i]
      element.value.cooked = cookedValuesMinfified[i]
    }
  }
}

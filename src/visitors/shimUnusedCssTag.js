import { useShimUnusedCssTag } from '../utils/options'
import { isCSSHelper } from '../utils/detectors'

const shimUnusedCssTag = t => (path, state) => {
  if (!useShimUnusedCssTag(state) || !isCSSHelper(t)(path.node.tag, state)) {
    return
  }

  const templateLiteral = path.node.quasi

  if (templateLiteral.expressions.length) {
    return
  }

  path.replaceWith(templateLiteral)
}

export default shimUnusedCssTag

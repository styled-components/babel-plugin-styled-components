import { useSkipPureString } from '../utils/options'
import { isCSSHelper } from '../utils/detectors'

const skipPureString = t => (path, state) => {
  if (!useSkipPureString(state) || !isCSSHelper(t)(path.node.tag, state)) {
    return
  }

  const templateLiteral = path.node.quasi

  if (templateLiteral.expressions.length) {
    return
  }

  path.replaceWith(templateLiteral)
}

export default skipPureString

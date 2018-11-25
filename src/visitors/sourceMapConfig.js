import { getSourceMap } from '../utils/sourceMap'
import { useSourceMap } from '../utils/options'
import { isCreateGlobalStyleHelper } from '../utils/detectors'
import { isUnconfiguredStyled } from './displayNameAndId'

export default t => (path, state) => {
  const isUnconfiguredCreateGlobalStyle =
    path.node.tag && isCreateGlobalStyleHelper(t)(path.node.tag, state)
  if (isUnconfiguredCreateGlobalStyle || isUnconfiguredStyled(t)(path, state)) {
    const sourceMap =
      useSourceMap(state) && getSourceMap(path.node.quasi.loc.start, state)
    if (sourceMap) {
      return [
        t.objectProperty(t.identifier('sourceMap'), t.stringLiteral(sourceMap)),
      ]
    }
  }
  return []
}

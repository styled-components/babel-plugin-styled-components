import * as t from 'babel-types'
import { isStyled, isHelper } from '../../utils/detectors'
import { useRootNode } from '../../utils/options'

function addRoot(quasi, state) {
  quasi.quasis[0].value.cooked = `${useRootNode(state)}& { ${
    quasi.quasis[0].value.cooked
  }`
  quasi.quasis[0].value.raw = `${useRootNode(state)}& { ${
    quasi.quasis[0].value.raw
  }`
  quasi.quasis[quasi.quasis.length - 1].value.cooked = `${
    quasi.quasis[quasi.quasis.length - 1].value.cooked
  } }`
  quasi.quasis[quasi.quasis.length - 1].value.raw = `${
    quasi.quasis[quasi.quasis.length - 1].value.raw
  } }`
  return quasi
}

export default (path, state) => {
  if (isStyled(path.node.tag, state) || isHelper(path.node.tag, state)) {
    const { tag, quasi } = path.node
    if (
      useRootNode(state) &&
      !quasi.quasis[0].value.cooked.includes(useRootNode(state))
    ) {
      path.replaceWith(t.taggedTemplateExpression(tag, addRoot(quasi, state)))
    }
  }
}

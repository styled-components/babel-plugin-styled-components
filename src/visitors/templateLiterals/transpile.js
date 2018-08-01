import * as t from 'babel-types'
import { isStyled, isHelper } from '../../utils/detectors'
import { useRootNode } from '../../utils/options'

function addRoot(quasis, state) {
  if (useRootNode(state)){
    quasis[0].value.cooked = `${useRootNode(state)}& { ${quasis[0].value.cooked}`
    quasis[quasis.length - 1].value.cooked = `${quasis[quasis.length - 1].value.cooked} }`
    return quasis.map(quasi => t.templateElement(quasi.value.cooked, quasi.tail))
  } else {
    return quasis.map(quasi => t.templateElement(quasi.value.cooked, quasi.tail))
  }
}

export default (path, state) => {
  if (
    isStyled(path.node.tag, state) ||
    isHelper(path.node.tag, state)
  ) {
    const { tag: callee, quasi: { quasis, expressions } } = path.node
    const values = t.templateElement(addRoot(quasis, state))

    path.replaceWith(t.templateLiteral(values, expressions))
  }
}

import annotateAsPure from '@babel/helper-annotate-as-pure'

import { usePureAnnotation } from '../utils/options'
import { isStyled, isPureHelper } from '../utils/detectors'

export default t => (path, state) => {
  if (usePureAnnotation(state)) {
    if (
      isStyled(t)(path.node, state, path.scope) ||
      isStyled(t)(path.node.callee, state, path.scope) ||
      isPureHelper(t)(path.node.tag || path.node.callee, state)
    ) {
      if (
        path.parent.type === 'VariableDeclarator' ||
        path.parent.type === 'TaggedTemplateExpression'
      ) {
        annotateAsPure(path)
      }
    }
  }
}

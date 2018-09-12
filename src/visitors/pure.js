import annotateAsPure from '@babel/helper-annotate-as-pure'

import { usePureAnnotation } from '../utils/options'
import { isStyled, isPureHelper } from '../utils/detectors'

export default t => (path, state) => {
  if (usePureAnnotation(state)) {
    if (
      isStyled(path.node, state) ||
      isStyled(path.node.callee, state) ||
      isPureHelper(path.node.callee, state)
    ) {
      if (
        path.parent.type == 'VariableDeclarator' ||
        path.parent.type == 'TaggedTemplateExpression'
      ) {
        annotateAsPure(path)
      }
    }
  }
}

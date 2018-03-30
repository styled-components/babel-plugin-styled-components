import annotateAsPure from '@babel/helper-annotate-as-pure'

import { useUglifyPure } from '../utils/options'
import { isStyled, isHelper } from '../utils/detectors'

export default t => (path, state) => {
  if (useUglifyPure(state)) {
    if (isStyled(path.node, state) ||
      isStyled(path.node.callee, state) ||
      isHelper(path.node.callee, state)
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

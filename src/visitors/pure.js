import annotateAsPure from '@babel/helper-annotate-as-pure'

import { usePureAnnotation } from '../utils/options'
import { isStyled, isPureHelper } from '../utils/detectors'
import pureWrapStaticProps from './pureWrapStaticProps'

export default t => (path, state) => {
  if (usePureAnnotation(state)) {
    if (
      isStyled(t)(path.node, state) ||
      isStyled(t)(path.node.callee, state) ||
      isPureHelper(t)(path.node.tag || path.node.callee, state)
    ) {
      if (
        path.parent.type === 'VariableDeclarator' ||
        path.parent.type === 'TaggedTemplateExpression'
      ) {
        annotateAsPure(path)
        if (path.parent.type === 'VariableDeclarator') {
          // if static properties were added to the styled component (e.g. `defaultProps`),
          // also wrap it in an IIFE and add a PURE comment to the IIFE
          pureWrapStaticProps(t)(path.parentPath, state, true)
        }
      }
    }
  }
}

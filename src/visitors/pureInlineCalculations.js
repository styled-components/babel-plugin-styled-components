import annotateAsPure from '@babel/helper-annotate-as-pure'

import { usePureAnnotation } from '../utils/options'
import { isStyled } from '../utils/detectors'

/*
 Calculations inside a template literal passed to styled-components can break tree-shaking when using terser, e.g.:
 `
   font-size: ${helper(2)};
   width: ${`50${widthUnits}`};
 `
 So we add PURE comments to any such calls.

 NB: This means that any helper functions used inside your styles should be side-effect free.
 In practical terms it's probably only an issue if the side-effect affects whether or not the component
 should be included in your bundle, but avoiding side effects in helper functions is a good practice
 anyhow.

 Another note: Assuming the `transpileTemplateLiterals` option is enabled, it seems that rollup's tree-shaking
 algorithm works fine without running this function. It seems to only be needed for terser.
 */
export default t => (path, state) => {
  if (!usePureAnnotation(state)) {
    return
  }
  if (isStyled(t)(path.node.tag, state)) {
    // loop through any ${} expressions inside the template
    for (const expr of path.node.quasi.expressions) {
      if (
        t.isCallExpression(expr) ||
        // template literals (which get transpiled to function calls when transpiling to ES5)
        // can break tree-shaking too
        t.isTemplateLiteral(expr)
      ) {
        annotateAsPure(expr)
      }
    }
  }
}

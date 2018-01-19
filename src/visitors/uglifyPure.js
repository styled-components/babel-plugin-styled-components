import annotateAsPure from "@babel/helper-annotate-as-pure"

import { useUglifyPure } from '../utils/options'
import { isStyled, isHelper, isInjectGlobalHelper } from '../utils/detectors'

export default (path, state) => {
    if(useUglifyPure(state)){
        if(isStyled(path.node,state) || 
          isStyled(path.node.callee,state) || 
          isHelper(path.node.callee,state) ||
          isInjectGlobalHelper(path.node.callee,state) 
        ){
            if(path.parent.type == 'VariableDeclarator' || 
              path.parent.type == 'TaggedTemplateExpression' ||
              path.parent.type =='ExpressionStatement'
            ){
                annotateAsPure(path)
            }
        }
    }
}
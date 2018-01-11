import {
  useCSSPreprocessor,
  useTranspileTemplateLiterals,
  useUglifyPure
} from '../../utils/options'
import annotateAsPure from "@babel/helper-annotate-as-pure";

import preprocess from './preprocess'
import transpile from './transpile'

export default (path, state) => {
  // We can only do one or the other, but preprocessing
  // disables the normal transpilation, obviously
  if (useCSSPreprocessor(state)) {
    preprocess(path, state)
  } else if (useTranspileTemplateLiterals(state)) {
    transpile(path, state)
  }

  // add uglify pure (/*#__PURE__*/) comment before function calls
  if(useUglifyPure(state)){
    path.node.leadingComments = path.node.leadingComments || []
    annotateAsPure(path)
  }
}

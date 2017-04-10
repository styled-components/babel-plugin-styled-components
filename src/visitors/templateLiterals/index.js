import {
  useCSSPreprocessor,
  useStaticExtraction,
  useTranspileTemplateLiterals
} from '../../utils/options'

import preprocess from './preprocess'
import transpile from './transpile'

export default (path, state, componentId, styleSheet) => {
  // We can only do one or the other, but preprocessing
  // disables the normal transpilation, obviously
  if (useCSSPreprocessor(state) || useStaticExtraction(state)) {
    preprocess(path, state, componentId, styleSheet)
  } else if (useTranspileTemplateLiterals(state)) {
    transpile(path, state)
  }
}

import {
  useCSSPreprocessor,
  useTranspileTemplateLiterals,
  useUglifyPure
} from '../../utils/options'

import preprocess from './preprocess'
import transpile from './transpile'

export default types => (path, state) => {
  // We can only do one or the other, but preprocessing
  // disables the normal transpilation, obviously
  if (useCSSPreprocessor(state)) {
    preprocess(types)(path, state)
  } else if (useTranspileTemplateLiterals(state)) {
    transpile(types)(path, state)
  }
}

import {
  useCSSPreprocessor,
  useTranspileTemplateLiterals,
  useURLPrefix
} from '../../utils/options'

import preprocess from './preprocess'
import transpile from './transpile'
import urlPrefix from './urlPrefix'

export default (path, state) => {
  // Conditionally parse `url()` statements in CSS attributes
  // and replace them with absolute URLs
  if (useURLPrefix(state)) {
    urlPrefix(path, state)
  }

  // We can only do one or the other, but preprocessing
  // disables the normal transpilation, obviously
  if (useCSSPreprocessor(state)) {
    preprocess(path, state)
  } else if (useTranspileTemplateLiterals(state)) {
    transpile(path, state)
  }
}

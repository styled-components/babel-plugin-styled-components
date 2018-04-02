import {
  useTranspileTemplateLiterals,
  useUglifyPure
} from '../../utils/options'

import transpile from './transpile'

export default (path, state) => {
  if (useTranspileTemplateLiterals(state)) {
    transpile(path, state)
  }
}

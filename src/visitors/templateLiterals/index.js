import { useTranspileTemplateLiterals } from '../../utils/options'
import transpile from './transpile'

export default types => (path, state) => {
  if (useTranspileTemplateLiterals(state)) {
    transpile(types)(path, state)
  }
}

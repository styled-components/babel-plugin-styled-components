import { useTranspileTemplateLiterals } from '../../utils/options'
import transpile from './transpile'

export default t => (path, state) => {
  if (useTranspileTemplateLiterals(state)) {
    transpile(t)(path, state)
  }
}

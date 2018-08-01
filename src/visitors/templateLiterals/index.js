import {
  useRootNode,
} from '../../utils/options'

import transpile from './transpile'

export default (path, state) => {
  if (useRootNode(state)) {
    transpile(path, state)
  }
}

import { noteStyledRequired, requireBindingName } from '../utils/detectors'

export default t => (path, state) => {
  const name = requireBindingName(t, path.node.id, path.node.init, state)
  if (!name) return
  state.styledRequired = name
  noteStyledRequired(state, name)
}

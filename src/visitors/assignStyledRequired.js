import { isValidTopLevelImport } from '../utils/detectors'

export default types => (path, state) => {
  if (
    types.isCallExpression(path.node.init) &&
    types.isIdentifier(path.node.init.callee) &&
    path.node.init.callee.name === 'require' &&
    path.node.init.arguments &&
    path.node.init.arguments[0] &&
    types.isLiteral(path.node.init.arguments[0]) &&
    isValidTopLevelImport(path.node.init.arguments[0].value)
  ) {
    state.styledRequired = path.node.id.name
  }
}

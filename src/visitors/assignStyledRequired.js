import { isValidTopLevelImport } from '../utils/detectors'

export default t => (path, state) => {
  if (
    t.isCallExpression(path.node.init) &&
    t.isIdentifier(path.node.init.callee) &&
    path.node.init.callee.name === 'require' &&
    path.node.init.arguments &&
    path.node.init.arguments[0] &&
    t.isLiteral(path.node.init.arguments[0]) &&
    isValidTopLevelImport(path.node.init.arguments[0].value, state)
  ) {
    state.styledRequired = path.node.id.name
  }
}

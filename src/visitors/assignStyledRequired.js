import { isValidTopLevelImport } from '../utils/detectors'

export default t => (path, state) => {
  let init = path.node.init;

  if (
    t.isCallExpression(path.node.init) &&
    t.isIdentifier(path.node.init.callee) &&
    init.callee.name === '_interopRequireDefault' &&
    init.arguments &&
    init.arguments[0]
  ) {
    // _interopRequireDefault(require())
    init = path.node.init.arguments[0];
  }

  if (
    t.isCallExpression(init) &&
    t.isIdentifier(init.callee) &&
    init.callee.name === 'require' &&
    init.arguments &&
    init.arguments[0] &&
    t.isLiteral(init.arguments[0]) &&
    isValidTopLevelImport(init.arguments[0].value, state)
  ) {
    state.styledRequired = path.node.id.name
  }
}

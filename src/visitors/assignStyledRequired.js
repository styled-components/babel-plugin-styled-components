import { isValidTopLevelImport } from '../utils/detectors'

export default t => (path, state) => {
  let init = path.node.init;

  if (
    t.isCallExpression(path.node.init) &&
    t.isIdentifier(path.node.init.callee) &&
    // `_interopRequireDefault` is Babel's CJS interop helper; `__importDefault`
    // is TypeScript's. Both wrap a require() so the caller can reach `.default`.
    (init.callee.name === '_interopRequireDefault' ||
      init.callee.name === '__importDefault') &&
    init.arguments &&
    init.arguments[0]
  ) {
    init = path.node.init.arguments[0];
  }

  if (
    t.isCallExpression(init) &&
    t.isIdentifier(init.callee) &&
    init.callee.name === 'require' &&
    init.arguments &&
    init.arguments[0] &&
    t.isStringLiteral(init.arguments[0]) &&
    isValidTopLevelImport(init.arguments[0].value, state)
  ) {
    state.styledRequired = path.node.id.name
  }
}

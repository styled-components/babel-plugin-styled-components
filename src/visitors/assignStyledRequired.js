import * as t from 'babel-types'

export default (path, state) => {
  if (
    t.isCallExpression(path.node.init) &&
    t.isIdentifier(path.node.init.callee) &&
    path.node.init.callee.name === 'require' &&
    path.node.init.arguments &&
    path.node.init.arguments[0] &&
    t.isLiteral(path.node.init.arguments[0]) &&
    path.node.init.arguments[0].value.startsWith('styled-components')
  ) {
    state.styledRequired = path.node.id.name
  }
}

import * as t from 'babel-types'

export default (path, state) => {
  if (t.isCallExpression(path.node.init) && t.isIdentifier(path.node.init.callee) && path.node.init.callee.name === 'require') {
    state.styledRequired = path.node.id.name
  }
}

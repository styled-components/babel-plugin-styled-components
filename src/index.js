import pureAnnotation from './visitors/pure'
import minify from './visitors/minify'
import displayNameAndId from './visitors/displayNameAndId'
import templateLiterals from './visitors/templateLiterals'
import assignStyledRequired from './visitors/assignStyledRequired'
import addConfig from './visitors/addConfig'
import sourceMapConfig from './visitors/sourceMapConfig'

export default function({ types: t }) {
  return {
    visitor: {
      CallExpression(path, state) {
        addConfig(t)(path, state)(displayNameAndId, sourceMapConfig)
        pureAnnotation(t)(path, state)
      },
      TaggedTemplateExpression(path, state) {
        minify(t)(path, state)
        addConfig(t)(path, state)(displayNameAndId, sourceMapConfig)
        templateLiterals(t)(path, state)
        pureAnnotation(t)(path, state)
      },
      VariableDeclarator(path, state) {
        assignStyledRequired(t)(path, state)
      },
    },
  }
}

import syntax from '@babel/plugin-syntax-jsx'
import assignStyledRequired from './visitors/assignStyledRequired'
import transpileCssProp from './visitors/transpileCssProp'
import { processCallExpression, processTaggedTemplate } from './visitors/process'

export default function ({ types: t }) {
  const transpileCssPropVisit = transpileCssProp(t)
  const assignStyledRequiredVisit = assignStyledRequired(t)
  const processCallExpressionVisit = processCallExpression(t)
  const processTaggedTemplateVisit = processTaggedTemplate(t)

  return {
    inherits: syntax,
    visitor: {
      Program(path, state) {
        path.traverse(
          {
            JSXAttribute(path, state) {
              transpileCssPropVisit(path, state)
            },
            VariableDeclarator(path, state) {
              assignStyledRequiredVisit(path, state)
            },
          },
          state
        )
      },
      CallExpression(path, state) {
        processCallExpressionVisit(path, state)
      },
      TaggedTemplateExpression(path, state) {
        processTaggedTemplateVisit(path, state)
      },
    },
  }
}

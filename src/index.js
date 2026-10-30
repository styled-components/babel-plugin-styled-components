import assignStyledRequired from './visitors/assignStyledRequired'
import transpileCssProp from './visitors/transpileCssProp'
import {
  processCallExpression,
  processTaggedTemplate,
} from './visitors/process'

export default function ({ types: t }) {
  const transpileCssPropVisit = transpileCssProp(t)
  const assignStyledRequiredVisit = assignStyledRequired(t)
  const processCallExpressionVisit = processCallExpression(t)
  const processTaggedTemplateVisit = processTaggedTemplate(t)

  return {
    // Same as @babel/plugin-syntax-jsx, whose peer range is pinned to one
    // Babel major. With TypeScript, the TypeScript preset decides per file
    // (.tsx) whether JSX is on, and forcing it breaks `<T>value` assertions
    manipulateOptions(opts, parserOpts) {
      if (
        parserOpts.plugins.some(
          p => (Array.isArray(p) ? p[0] : p) === 'typescript'
        )
      ) {
        return
      }
      parserOpts.plugins.push('jsx')
    },
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

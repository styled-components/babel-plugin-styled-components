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
    // Babel 8's TypeScript preset runs later and leaves `jsx` on .ts files,
    // where it breaks `<T>value` assertions, so the extension decides first
    manipulateOptions(opts, parserOpts) {
      if (
        /\.[cm]?ts$/.test(opts.filename) ||
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

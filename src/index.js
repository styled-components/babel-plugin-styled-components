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
    // Babel major. Presets run after this, and Babel 8's TypeScript preset
    // neither removes `jsx` from .ts files nor adds it to .tsx files, so the
    // extension decides: `jsx` breaks `<T>value` assertions in .ts
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

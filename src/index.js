import templateLiterals from './visitors/templateLiterals'

export default function({ types: t }) {
  return {
    visitor: {
      TaggedTemplateExpression(path, state) {
        templateLiterals(path, state)
      }
    },
  }
}

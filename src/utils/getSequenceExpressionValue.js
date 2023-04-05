export default path =>
  path.expressions && path.expressions.length
    ? path.expressions[path.expressions.length - 1]
    : undefined

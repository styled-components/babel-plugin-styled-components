const shiftInterpolations = (interpolations, shift) => interpolations
  .map(interpolation => Object.assign({}, interpolation, {
    loc: [
      interpolation.loc[0] + shift,
      interpolation.loc[1] + shift,
    ]
  }))

export const prependSelector = (selectorNode, prepend) => Object.assign(
  {},
  selectorNode,
  {
    interpolations: shiftInterpolations(selectorNode.interpolations, prepend.length + 1),
    value: `${prepend} ${selectorNode.value}`
  }
)

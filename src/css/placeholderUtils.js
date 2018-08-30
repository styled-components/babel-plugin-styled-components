// The capture group makes sure that the split contains the interpolation index
export const placeholderRegex = /(?:__PLACEHOLDER_(\d+)__)/g

// Alternative regex that splits without a capture group
const placeholderNonCapturingRegex = /__PLACEHOLDER_(?:\d+)__/g

// Generates a placeholder from an index
export const makePlaceholder = index => `__PLACEHOLDER_${index}__`

// Splits CSS by placeholders
export const splitByPlaceholders = ([css, ...rest], capture = true) => [
  css.split(capture ? placeholderRegex : placeholderNonCapturingRegex),
  ...rest,
]

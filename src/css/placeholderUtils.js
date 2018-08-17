// The capture group makes sure that the split contains the interpolation index
const placeholderRegex = /__PLACEHOLDER_(\d+?)__/

// Alternative regex that splits without a capture group
const placeholderNonCapturingRegex = /__PLACEHOLDER_(?:\d+?)__/

// Generates a placeholder from an index
export const makePlaceholder = index => `__PLACEHOLDER_${index}__`

// Splits CSS by placeholders
export const splitByPlaceholders = (css, capture = true) =>
  css.split(capture ? placeholderRegex : placeholderNonCapturingRegex)

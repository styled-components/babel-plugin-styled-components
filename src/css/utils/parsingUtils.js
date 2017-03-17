export const findToken = (css, needle, start, end) => {
  let index = start

  while (
    css[index] !== needle &&
    index <= end
  ) {
    index++
  }

  // Throw if there's no matching token
  if (index > end) {
    throw new Error(`Unexpected token! Unable to find matching '${needle}'.`)
  }

  return index
}

export const findClosingParanthesis = (css, start, end) => {
  let level = 1
  let index

  for(
    index = start;
    level > 0 && index <= end;
    index++
  ) {
    const token = css[index]

    if (token === '{') {
      level++
    } else if (token === '}') {
      level--
    }
  }

  // Throw if there's no matching token
  if (index >= end) {
    throw new Error(`Unexpected token! Unable to find matching '}'.`)
  }

  return index
}

// Filters nodes for `loc` that falls in-between start and end
export const filterNodesForLocation = (nodes, start, end) => nodes
  .filter(({ loc }) => (
    loc[0] >= start && loc[0] <= end &&
    loc[1] >= start && loc[1] <= end
  ))


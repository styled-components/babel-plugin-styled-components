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


const reduceMap = (map, reducer, initial) => {
  let acc = initial
  for (const entry of map) {
    acc = reducer(acc, entry)
  }

  return acc
}

export default reduceMap

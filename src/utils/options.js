function getOption({ opts }, name, defaultValue = true) {
  return opts[name] === undefined || opts[name] === null
    ? defaultValue
    : opts[name]
}

export const useRootNode = state => {
  const root = getOption(state, 'rootNode', false)
  if (root){
    return root.startsWith('&') ? root : root + " "
  } else {
    return root
  }
}

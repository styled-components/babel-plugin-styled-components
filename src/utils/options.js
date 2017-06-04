function getOption({ opts }, name, defaultValue = true) {
  return opts[name] === undefined || opts[name] === null ? defaultValue : opts[name]
}

export const useDisplayName = (state) => getOption(state, 'displayName')
export const useFileName = (state) => getOption(state, 'fileName')
export const useMinify = (state) => getOption(state, 'minify')
export const useCSSPreprocessor = (state) => getOption(state, 'preprocess', false) // EXPERIMENTAL
export const useTranspileTemplateLiterals = (state) => getOption(state, 'transpileTemplateLiterals')

export const useSSR = (state) => {
  const value = getOption(state, 'ssr', false)
  switch (value) {
    case false:
      return null
    case true:
    case 'use-content':
      return 'use-content'
    case 'use-mtime':
      return 'use-mtime'
    default:
      throw new Error(`Invalid value for useSSR option: ${value}`)
  }
}

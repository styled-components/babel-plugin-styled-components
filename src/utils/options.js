function getOption({ opts }, name, defaultValue = true) {
  return opts[name] === undefined || opts[name] === null
    ? defaultValue
    : opts[name]
}

export const useDisplayName = state => getOption(state, 'displayName')
export const useSSR = state => getOption(state, 'ssr', true)
export const useFileName = state => getOption(state, 'fileName')
export const useFolderName = state => getOption(state, 'folderName', false)
export const useMinify = state => getOption(state, 'minify')
export const useTranspileTemplateLiterals = state =>
  getOption(state, 'transpileTemplateLiterals')

export const usePureAnnotation = state => getOption(state, 'pure', false)

export const useCssProp = state => getOption(state, 'cssProp', true)

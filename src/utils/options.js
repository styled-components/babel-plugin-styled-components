import pm from 'picomatch';

function getOption({ opts }, name, defaultValue = true) {
  return opts[name] === undefined || opts[name] === null
    ? defaultValue
    : opts[name]
}

export const useDisplayName = state => getOption(state, 'displayName')
export const useTopLevelImportPathMatchers = state =>
  getOption(state, 'topLevelImportPaths', []).map(pattern => pm(pattern))
export const useSSR = state => getOption(state, 'ssr', true)
export const useFileName = state => getOption(state, 'fileName')
export const useMeaninglessFileNames = state => getOption(state, 'meaninglessFileNames', ['index'])
export const useMinify = state => getOption(state, 'minify')
export const useTranspileTemplateLiterals = state =>
  getOption(state, 'transpileTemplateLiterals')

export const useNamespace = state => {
  const namespace = getOption(state, 'namespace', '')
  if (namespace) {
    return `${namespace}__`
  }
  return ''
}

export const usePrefix = state => {
  const prefix = getOption(state, 'prefix', '')
  if (prefix) {
    return `${prefix}`
  }
  return 'sc'
}

export const usePureAnnotation = state => getOption(state, 'pure', false)

export const useCssProp = state => getOption(state, 'cssProp', true)

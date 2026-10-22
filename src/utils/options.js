import pm from 'picomatch';

function getOption({ opts }, name, defaultValue = true) {
  return opts[name] === undefined || opts[name] === null
    ? defaultValue
    : opts[name]
}

export const useDisplayName = state => getOption(state, 'displayName')

const NO_PATTERNS = []
// Compiled matchers per topLevelImportPaths value, so each config compiles once
const compiledMatchers = new WeakMap()

export const useTopLevelImportPathMatchers = state => {
  const patterns = getOption(state, 'topLevelImportPaths', NO_PATTERNS)
  let matchers = compiledMatchers.get(patterns)

  if (!matchers) {
    matchers = patterns.map(pattern => pm(pattern))
    compiledMatchers.set(patterns, matchers)
  }

  return matchers
}

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

export const usePureAnnotation = state => getOption(state, 'pure', false)

export const useCssProp = state => getOption(state, 'cssProp', true)

export const useCssPropImportPath = state =>
  getOption(state, 'cssPropImportPath', 'styled-components')

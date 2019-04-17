function getOption({ opts }, name, defaultValue = true) {
  const envOrDefault = opts.env ? opts.env[process.env.NODE_ENV] || opts : opts

  return envOrDefault[name] === undefined || envOrDefault[name] === null
    ? defaultValue
    : envOrDefault[name]
}

export const useDisplayName = state => getOption(state, 'displayName')
export const useSSR = state => getOption(state, 'ssr', true)
export const useFileName = state => getOption(state, 'fileName')
export const useMinify = state => getOption(state, 'minify')
export const useTranspileTemplateLiterals = state =>
  getOption(state, 'transpileTemplateLiterals')

export const usePureAnnotation = state => getOption(state, 'pure', false)

export const useCssProp = state => getOption(state, 'cssProp', true)

import semver from 'semver'
import styledPkg from 'styled-components/package.json'

function getOption({ opts }, name, defaultValue = true) {
  return opts[name] === undefined || opts[name] === null
    ? defaultValue
    : opts[name]
}

export const useDisplayName = state => getOption(state, 'displayName')
export const useSSR = state => getOption(state, 'ssr', true)
export const useFileName = state => getOption(state, 'fileName')
export const useMinify = state => getOption(state, 'minify')
export const useTranspileTemplateLiterals = state =>
  getOption(state, 'transpileTemplateLiterals')

/**
 * When using the babel plugin, we desugar styled.div to styled('div'), which means we can
 * then use a lighter-weight version of s-c (v4+) since those element names don't need to be kept around
 * ahead of time.
 */
export const useNoTags = () => semver.satisfies(styledPkg.version, '>= 4')

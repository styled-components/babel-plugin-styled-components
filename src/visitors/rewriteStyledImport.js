import { useNoTags } from '../utils/options'

/**
 * When using the babel plugin, we desugar styled.div to styled('div'), which means we can
 * then use a lighter-weight version of s-c (v4+) since those element names don't need to be kept around
 * ahead of time.
 */
export default t => path => {
  if (useNoTags() && path.node.source.value === 'styled-components') {
    path.node.source = t.stringLiteral('styled-components/no-tags')
  }
}

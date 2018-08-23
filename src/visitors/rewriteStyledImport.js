/**
 * When using the Babel plugin, we desugar styled.div to styled('div'), which means we can
 * then use a lighter-weight version of s-c since those element names don't need to be kept around
 * ahead of time.
 */
export default types => path => {
  if (path.node.source.value === 'styled-components') {
    path.node.source = types.stringLiteral('styled-components/no-tags')
  }
}

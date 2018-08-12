import * as t from 'babel-types'
import get from 'lodash/get'
import { isStyled } from '../utils/detectors'

/**
 * When using the Babel plugin, we desugar styled.div to styled('div'), which means we can
 * then use a lighter-weight version of s-c since those element names don't need to be kept around
 * ahead of time.
 */
export default path => {
  if (path.node.source.value === 'styled-components') {
    path.node.source = t.stringLiteral('styled-components/no-tags')
  }
}

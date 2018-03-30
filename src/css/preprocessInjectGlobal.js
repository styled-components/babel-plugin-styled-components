import {
  convertOutputToBabelTypes,
  preprocessHelper
} from './preprocessUtils'

export default (types, cssArr, interpolationNodes) => (
  convertOutputToBabelTypes(
    types,
    preprocessHelper(
      cssArr,
      interpolationNodes,
      x => '{' + x + '}',
      '', // no namespace
      true // fix globals
    )
  )
)

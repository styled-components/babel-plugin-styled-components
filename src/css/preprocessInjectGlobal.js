import {
  convertOutputToBabelTypes,
  preprocessHelper
} from './preprocessUtils'

export default (cssArr, interpolationNodes) => (
  convertOutputToBabelTypes(
    preprocessHelper(
      cssArr,
      interpolationNodes,
      x => '{' + x + '}',
      '', // no namespace
      'global'
    )
  )
)

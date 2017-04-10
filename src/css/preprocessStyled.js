import {
  temporaryClassname
} from './placeholderUtils'

import {
  convertOutputToBabelTypes,
  preprocessHelper
} from './preprocessUtils'

export default (cssArr, interpolationNodes, middleware) => (
  convertOutputToBabelTypes(
    preprocessHelper(
      cssArr,
      interpolationNodes,
      x => x,
      temporaryClassname,
      'styled',
      middleware
    )
  )
)

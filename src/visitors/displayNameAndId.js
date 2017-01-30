import * as t from 'babel-types'
import { generate as generateShortId } from 'shortid'
import { useDisplayName, useSSR } from '../utils/options'
import getName from '../utils/getName'
import { isStyled } from '../utils/detectors'

const addConfig = (path, displayName, componentId) => {
  if (!displayName && !componentId) {
    return
  }

  const withConfigProps = []
  if (displayName) {
    withConfigProps.push(t.objectProperty(t.identifier('displayName'), t.stringLiteral(displayName)))
  }

  if (componentId) {
    withConfigProps.push(t.objectProperty(t.identifier('componentId'), t.stringLiteral(componentId)))
  }

  // Replace x`...` with x.withConfig({ })`...`
  path.node.tag = t.callExpression(
    t.memberExpression(path.node.tag, t.identifier('withConfig')),
    [ t.objectExpression(withConfigProps) ]
  )
}

const getComponentId = (displayName) => {
  const id = generateShortId()
  return `${displayName || 's'}-${id}`
}

export default (path, state) => {
  if (isStyled(path.node.tag, state)) {
    const displayName = getName(path)
    const componentId = getComponentId(displayName)

    addConfig(
      path,
      useDisplayName(state) && displayName,
      useSSR(state) && componentId
    )
  }
}

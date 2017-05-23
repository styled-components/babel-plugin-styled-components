import * as t from 'babel-types'
import { useFileName, useDisplayName, useSSR, useStaticExtraction } from '../utils/options'
import getName from '../utils/getName'
import { isStyled } from '../utils/detectors'

const blockName = (file) => {
  return file.opts.basename !== 'index' ?
    file.opts.basename :
    path.basename(path.dirname(file.opts.filename))
}

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

const getDisplayName = (path, state) => {
  const { file } = state
  const componentName = getName(path)
  if (file) {
    return componentName ? `${blockName(file)}__${componentName}` : blockName(file)
  } else {
    return componentName
  }
}

export default (path, state, componentId) => {
  if (isStyled(path.node.tag, state)) {
    const _useDisplayName = useDisplayName(state)
    const _useSSR = useSSR(state)
    const _useStaticExtraction = useStaticExtraction(state)
    const _useFileName = useFileName(state)

    addConfig(
      path,
      _useDisplayName && getDisplayName(path, _useFileName && state),
      (_useSSR || _useStaticExtraction) && componentId
    )
  }
}

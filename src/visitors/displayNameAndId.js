import path from 'path'
import fs from 'fs'
import { useFileName, useDisplayName, useSSR } from '../utils/options'
import getName from '../utils/getName'
import prefixLeadingDigit from '../utils/prefixDigit'
import hash from '../utils/hash'
import { isStyled } from '../utils/detectors'

const getConfig = t => (path, displayName, componentId, sourceMap) => {
  if (!displayName && !componentId) {
    return []
  }

  const withConfigProps = []
  if (displayName) {
    withConfigProps.push(
      t.objectProperty(
        t.identifier('displayName'),
        t.stringLiteral(displayName)
      )
    )
  }
  if (componentId) {
    withConfigProps.push(
      t.objectProperty(
        t.identifier('componentId'),
        t.stringLiteral(componentId)
      )
    )
  }

  return withConfigProps
}

const getBlockName = file => {
  const name = path.basename(
    file.opts.filename,
    path.extname(file.opts.filename)
  )
  return name !== 'index'
    ? name
    : path.basename(path.dirname(file.opts.filename))
}

const getDisplayName = t => (path, state) => {
  const { file } = state
  const componentName = getName(t)(path)
  if (file) {
    const blockName = getBlockName(file)
    if (blockName === componentName) {
      return componentName
    }
    return componentName
      ? `${prefixLeadingDigit(blockName)}__${componentName}`
      : prefixLeadingDigit(blockName)
  } else {
    return componentName
  }
}

const findModuleRoot = filename => {
  if (!filename) {
    return null
  }
  let dir = path.dirname(filename)
  if (fs.existsSync(path.join(dir, 'package.json'))) {
    return dir
  } else if (dir !== filename) {
    return findModuleRoot(dir)
  } else {
    return null
  }
}

const FILE_HASH = 'styled-components-file-hash'
const COMPONENT_POSITION = 'styled-components-component-position'
const separatorRegExp = new RegExp(`\\${path.sep}`, 'g')

const getFileHash = state => {
  const { file } = state
  // hash calculation is costly due to fs operations, so we'll cache it per file.
  if (file.get(FILE_HASH)) {
    return file.get(FILE_HASH)
  }
  const filename = file.opts.filename
  // find module root directory
  const moduleRoot = findModuleRoot(filename)
  const filePath =
    moduleRoot &&
    path.relative(moduleRoot, filename).replace(separatorRegExp, '/')
  const moduleName =
    moduleRoot &&
    JSON.parse(fs.readFileSync(path.join(moduleRoot, 'package.json'))).name
  const code = file.code

  const stuffToHash = [moduleName]

  if (filePath) {
    stuffToHash.push(filePath)
  } else {
    stuffToHash.push(code)
  }

  const fileHash = hash(stuffToHash.join(''))
  file.set(FILE_HASH, fileHash)
  return fileHash
}

const getNextId = state => {
  const id = state.file.get(COMPONENT_POSITION) || 0
  state.file.set(COMPONENT_POSITION, id + 1)
  return id
}

const getComponentId = state => {
  // Prefix the identifier with a character because CSS classes cannot start with a number
  return `${prefixLeadingDigit(getFileHash(state))}-${getNextId(state)}`
}
export const isUnconfiguredStyled = t => (path, state) =>
  path.node.tag
    ? isStyled(t)(path.node.tag, state)
    : isStyled(t)(path.node.callee, state) &&
      path.node.callee.property &&
      path.node.callee.property.name !== 'withConfig'

export default t => (path, state) => {
  if (isUnconfiguredStyled(t)(path, state)) {
    const displayName =
      useDisplayName(state) &&
      getDisplayName(t)(path, useFileName(state) && state)

    return getConfig(t)(
      path,
      displayName && displayName.replace(/[^_a-zA-Z0-9-]/g, ''),
      useSSR(state) && getComponentId(state)
    )
  }
  return []
}

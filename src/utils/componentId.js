import fs from 'fs'
import hash from '../utils/hash'
import path from 'path'

const FILE_HASH = 'styled-components-file-hash'
const COMPONENT_POSITION = 'styled-components-component-position'

const findModuleRoot = (filename) => {
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

const getFileHash = (state) => {
  const { file } = state
  // hash calculation is costly due to fs operations, so we'll cache it per file.
  if (file.get(FILE_HASH)) {
    return file.get(FILE_HASH)
  }
  const filename = file.opts.filename
  // find module root directory
  const moduleRoot = findModuleRoot(filename)
  const filePath = moduleRoot && path.relative(moduleRoot, filename).replace(path.sep, '/')
  const moduleName = moduleRoot && JSON.parse(fs.readFileSync(path.join(moduleRoot, 'package.json'))).name
  const code = file.code

  const fileHash = hash([moduleName, filePath, code].join(''))
  file.set(FILE_HASH, fileHash)
  return fileHash
}

const getNextId = (state) => {
  const id = state.file.get(COMPONENT_POSITION) || 0
  state.file.set(COMPONENT_POSITION, id + 1)
  return id
}

const getComponentId = (state) => {
  // Prefix the identifier with a character because CSS classes cannot start with a number
  return `${getFileHash(state).replace(/^(\d)/, 's$1')}-${getNextId(state)}`
}

export default getComponentId

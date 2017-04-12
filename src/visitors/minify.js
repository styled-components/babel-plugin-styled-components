import * as t from 'babel-types'
import {
  useMinify,
  useCSSPreprocessor
} from '../utils/options'
import { isStyled, isHelper } from '../utils/detectors'

const commentRegex = /\s*\/\*([\s\S]*?)\*\/\s*/g
const multiNewlineRegex = /\n\n+/g

const minify = (linebreak) => {
  const regex = new RegExp(linebreak + '\\s*', 'g')

  return code => code
    .split(regex)
    .map(line => {
      const lineCommentStart = line.indexOf('//')
      return lineCommentStart > -1 ?
        line.slice(0, lineCommentStart) :
        line
    })
    .filter(Boolean)
    .join('')
    .replace(commentRegex, '\n')
    .replace(multiNewlineRegex, '\n')
}

const minifyRaw = minify('(?:\\\\r|\\\\n|\\r|\\n)')
const minifyCooked = minify('[\\r\\n]')

export default (path, state) => {
  if (
    useMinify(state) &&
    !useCSSPreprocessor(state) &&
    (
      isStyled(path.node.tag, state) ||
      isHelper(path.node.tag, state)
    )
  ) {
    const templateLiteral = path.node.quasi
    for (let element of templateLiteral.quasis) {
      element.value.raw = minifyRaw(element.value.raw)
      element.value.cooked = minifyCooked(element.value.cooked)
    }
  }
}

import * as t from 'babel-types'

import { useMinify, useCSSPreprocessor } from '../utils/options'
import { isStyled, isHelper } from '../utils/detectors'
import { makePlaceholder, splitByPlaceholders } from '../css/placeholderUtils'

const makeMultilineCommentRegex = newlinePattern => new RegExp('\\/\\*(.|' + newlinePattern + ')*?\\*\\/', 'g')
const lineCommentStart = /\/\//g

// Counts occurences of substr inside str
const countOccurences = (str, substr) => str.split(substr).length - 1

// Joins substrings until predicate returns true
const reduceSubstr = (substrs, join, predicate) => {
  const length = substrs.length
  let res = substrs[0]

  if (length === 1) {
    return res
  }

  for (let i = 1; i < length; i++) {
    if (predicate(res)) {
      break
    }

    res += join + substrs[i]
  }

  return res
}

// Joins at comment starts when it's inside a string or parantheses
// effectively removing line comments
const stripLineComment = line => (
  reduceSubstr(line.split(lineCommentStart), '//', str => (
    !str.endsWith(':') && // NOTE: This is another guard against urls, if they're not inside strings or parantheses.
    countOccurences(str, '\'') % 2 === 0 &&
    countOccurences(str, '\"') % 2 === 0 &&
    countOccurences(str, '(') === countOccurences(str, ')')
  ))
)

// Detects lines that are exclusively line comments
const isLineComment = line => line.trim().startsWith('//')

// Minifies spaces around common special characters in CSS
const minifyCommonChars = line => line.replace(/\s*([:;{}])\s*/, (_, p1) => p1)

// Creates a minifier with a certain linebreak pattern
const minify = linebreakPattern => {
  const linebreakRegex = new RegExp(linebreakPattern + '\\s*', 'g')
  const multilineCommentRegex = makeMultilineCommentRegex(linebreakPattern)

  return code => {
    const lines = code
      .replace(multilineCommentRegex, '\n') // Remove multiline comments
      .split(linebreakRegex) // Split at newlines
      .map(stripLineComment) // Remove line comments inside text

    return lines
      .filter(line => !isLineComment(line)) // Removes lines containing only line comments
      // NOTE: I was too lazy to turn this on and update all fixtures: `.map(minfifyCommonChars)`
      .join('')
  }
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

    const rawValuesMinified = splitByPlaceholders(
      minifyRaw(
        templateLiteral.quasis
          .map(x => x.value.raw)
          .join(makePlaceholder(123))
      ),
      false
    )

    const cookedValuesMinfified = splitByPlaceholders(
      minifyCooked(
        templateLiteral.quasis
          .map(x => x.value.cooked)
          .join(makePlaceholder(123))
      ),
      false
    )

    const quasisLength = templateLiteral.quasis.length

    for (let i = 0; i < quasisLength; i++) {
      const element = templateLiteral.quasis[i]

      element.value.raw = rawValuesMinified[i]
      element.value.cooked = cookedValuesMinfified[i]
    }
  }
}

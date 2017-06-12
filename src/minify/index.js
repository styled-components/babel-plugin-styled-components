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
export const stripLineComment = line => (
  reduceSubstr(line.split(lineCommentStart), '//', str => (
    !str.endsWith(':') && // NOTE: This is another guard against urls, if they're not inside strings or parantheses.
    countOccurences(str, '\'') % 2 === 0 &&
    countOccurences(str, '\"') % 2 === 0 &&
    countOccurences(str, '(') === countOccurences(str, ')')
  ))
)

// Detects lines that are exclusively line comments
const isLineComment = line => line.trim().startsWith('//')

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
      .join('')
  }
}

export const minifyRaw = minify('(?:\\\\r|\\\\n|\\r|\\n)')
export const minifyCooked = minify('[\\r\\n]')

export const minifyRawValues = rawValues => splitByPlaceholders(
  minifyRaw(
    rawValues.join(makePlaceholder(123))
  ),
  false
)

export const minifyCookedValues = cookedValues => splitByPlaceholders(
  minifyCooked(
    cookedValues.join(makePlaceholder(123))
  ),
  false
)

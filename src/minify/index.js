import {
  makePlaceholder,
  placeholderRegex,
  splitByPlaceholders,
} from '../css/placeholderUtils'

const difference = (a, b) => {
  if (!a) return []
  const set = new Set(b)
  return a.filter(x => !set.has(x))
}

const injectUniquePlaceholders = strArr => {
  let i = 0

  return strArr.reduce((str, val, index, arr) => {
    return str + val + (index < arr.length - 1 ? makePlaceholder(i++) : '')
  }, '')
}

const makeMultilineCommentRegex = newlinePattern =>
  new RegExp('\\/\\*[^!](.|' + newlinePattern + ')*?\\*\\/', 'g')
const symbolRegex = /(\s*[;:{},]\s*)/g

// Returns the quote character still open at the end of str, given the one open
// at its start ('' when outside a string). A backslash escapes the next character
const quoteOpenAfter = (str, quote) => {
  for (let i = 0; i < str.length; i++) {
    const char = str[i]

    if (char === '\\') {
      i++
    } else if (quote) {
      if (char === quote) {
        quote = ''
      }
    } else if (char === '"' || char === "'") {
      quote = char
    }
  }

  return quote
}

// Cuts the line at the first `//` the styled-components runtime treats as a
// comment: outside strings and parentheses, and not directly after a colon
// (`https://`). A `)` without a match on the line closes a value opened on a
// previous line (e.g. `);` after `minmax(`), so it's ignored
export const stripLineComment = line => {
  if (line.indexOf('//') === -1) {
    return line
  }

  let depth = 0
  let quote = ''

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '\\') {
      i++
    } else if (quote) {
      if (char === quote) {
        quote = ''
      }
    } else if (char === '"' || char === "'") {
      quote = char
    } else if (char === '(') {
      depth++
    } else if (char === ')') {
      if (depth > 0) {
        depth--
      }
    } else if (
      char === '/' &&
      line[i + 1] === '/' &&
      depth === 0 &&
      line[i - 1] !== ':'
    ) {
      return line.slice(0, i)
    }
  }

  return line
}

export const compressSymbols = code => {
  let quote = ''

  return code.split(symbolRegex).reduce((str, fragment, index) => {
    // Even-indices are non-symbol fragments
    if (index % 2 === 0) {
      quote = quoteOpenAfter(fragment, quote)

      return str + fragment
    }

    // Only manipulate symbols outside of strings
    if (quote) {
      return str + fragment
    }

    // Preserve whitespace preceding colon, to avoid joining selectors.
    if (/^\s+:/.test(fragment)) {
      return str + ' ' + fragment.trim()
    }

    return str + fragment.trim()
  }, '')
}

// Detects lines that are exclusively line comments
const isLineComment = line => line.trim().startsWith('//')

// Creates a minifier with a certain linebreak pattern
const minify = linebreakPattern => {
  const linebreakRegex = new RegExp(linebreakPattern + '\\s*', 'g')
  const multilineCommentRegex = makeMultilineCommentRegex(linebreakPattern)

  return code => {
    const newCode = code
      .replace(multilineCommentRegex, '\n') // Remove multiline comments
      .split(linebreakRegex) // Split at newlines
      .filter(line => line.length > 0 && !isLineComment(line)) // Removes lines containing only line comments
      .map(stripLineComment) // Remove line comments inside text
      .join(' ') // Rejoin all lines

    const eliminatedExpressionIndices = difference(
      code.match(placeholderRegex),
      newCode.match(placeholderRegex)
    ).map(x => parseInt(x.match(/\d+/)[0], 10))

    return [compressSymbols(newCode), eliminatedExpressionIndices]
  }
}

export const minifyRaw = minify('(?:\\\\r|\\\\n|\\r|\\n)')
export const minifyCooked = minify('[\\r\\n]')

export const minifyRawValues = rawValues =>
  splitByPlaceholders(minifyRaw(injectUniquePlaceholders(rawValues)), false)

export const minifyCookedValues = cookedValues =>
  splitByPlaceholders(
    minifyCooked(injectUniquePlaceholders(cookedValues)),
    false
  )

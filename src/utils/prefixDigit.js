export default function prefixLeadingDigit(str) {
  return str.replace(/^(\d)/, 'css-$1')
}

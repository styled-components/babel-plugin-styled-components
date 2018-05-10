export default function prefixLeadingDigit(str) {
  return str.replace(/^(\d)/, 'sc-$1')
}

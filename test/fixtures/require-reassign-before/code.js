let sc = require('styled-components')

const Before = sc.div`color: red;`

// The function can run after `sc` is replaced, so this stays plain.
function writtenAbove() {
  return sc.span`color: blue;`
}

sc = { div: s => () => null, span: s => () => null }

const After = sc.div`color: green;`
const Late = writtenAbove()

let sc = require('styled-components')

const Before = sc.div`color: red;`

// Written above the assignment, so this stays decorated even though the
// function runs after `sc` has been replaced.
function writtenAbove() {
  return sc.span`color: blue;`
}

sc = { div: s => () => null, span: s => () => null }

const After = sc.div`color: green;`
const Late = writtenAbove()

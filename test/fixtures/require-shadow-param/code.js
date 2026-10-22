const sc = require('styled-components')

function make(sc) {
  return sc.div`color: red;`
}

const Comp = make({ div: s => () => null })
const Real = sc.default.div`color: blue;`

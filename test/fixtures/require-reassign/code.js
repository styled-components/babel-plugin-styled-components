const real = require('styled-components')
let sc = require('styled-components')

sc = { div: s => () => null }

const Comp = sc.div`color: red;`
const Real = real.default.div`color: blue;`

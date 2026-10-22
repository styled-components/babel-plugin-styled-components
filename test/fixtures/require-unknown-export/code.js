const sc = require('styled-components')

function Base(props) {
  return props.children || null
}

const Comp = sc.default.div`color: red;`
const n = typeof sc.somethingNew === 'function' ? sc.somethingNew(Base) : null
const Ghost = sc.somethingNew`color: blue;`

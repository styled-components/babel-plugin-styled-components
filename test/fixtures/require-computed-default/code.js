const sc = require('styled-components')

function Base(props) {
  return props.children || null
}

const Tagged = sc['default'].div`color: red;`
const Called = sc['default'](Base)`color: blue;`
const ObjectCalled = sc['default'](Base)({ color: 'green' })

const sc = require('styled-components')
const styled = { box: s => () => null }

const Comp = sc.default.div`color: red;`
const Other = styled.box`color: blue;`

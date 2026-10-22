const styled = require('styled-components').default

const Early = styled.h1`color: blue;`
const A = () => <div css="color: red;" />

const late = require('styled-components')['default']
const Late = late.span`color: green;`

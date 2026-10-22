const sc = require('styled-components')

const A = sc.div`color: red;`
const B = sc.default.div`color: blue;`
const ok = sc.isStyledComponent(A)
const theme = sc.createTheme({})
const extracted = sc.extractCSS()
const sheet = sc.toStyleSheet()
const factory = sc.styled(A)

const sc = require('styled-components')

const A = sc.div`color: red;`
const B = sc.default.div`color: blue;`
const ok = sc.isStyledComponent(A)
const theme = sc.createTheme({})
const extracted = sc.extractCSS()
const sheet = sc.toStyleSheet()
const factory = sc.styled(A)
const viaDefault = sc.default.isStyledComponent(A)
const viaComputed = sc['isStyledComponent'](A)
const themeComputed = sc.default['createTheme']({})
const C = sc['div']`color: green;`
const D = sc.default['div']`color: orange;`

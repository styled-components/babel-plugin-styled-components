import * as ns from 'styled-components'

const Tagged = ns.default.div`color: red;`
const ok = ns.default.isStyledComponent(Tagged)
const theme = ns.default['createTheme']({})
const viaComputed = ns['isStyledComponent'](Tagged)
const Also = ns.default['div']`color: blue;`
const helperCss = ns.default.css`color: green;`
const helperComputed = ns['css']`color: purple;`
const Proxy = ns.box`color: white;`
const ProxyDefault = ns.default.foo`color: black;`

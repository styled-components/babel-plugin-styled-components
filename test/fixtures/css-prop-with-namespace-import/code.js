// Regression: when the only styled-components binding in scope is a namespace
// import, the css-prop transform must not emit `styled("div")` (the namespace
// object isn't callable). It should fall back to injecting a fresh default
// import and route the css-prop component through that callable identifier.
import * as styled from 'styled-components'

const App = () => <div css="color: red;" />

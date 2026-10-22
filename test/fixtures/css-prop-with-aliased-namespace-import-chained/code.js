import * as sc from 'styled-components'

const Title = sc.default.h1.attrs({ role: 'heading' })`
  color: blue;
`

const Wrapper = sc.default.div`
  margin: 0;
`

const A = () => <div css="color: red;" />

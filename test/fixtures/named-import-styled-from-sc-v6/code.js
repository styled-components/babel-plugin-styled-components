// Regression: styled-components v6 exposes a named `styled` export. The
// detector resolves `import { styled } from 'styled-components'` to the same
// local binding the default import would produce, so member and call forms
// both pick up displayName and componentId.
import { styled } from 'styled-components'

const Foo = styled.div`
  color: red;
`

const Bar = styled('span')`
  color: blue;
`

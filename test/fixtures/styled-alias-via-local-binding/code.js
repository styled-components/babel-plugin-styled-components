// Regression: TypeScript theme-typing patterns re-bind the default import
// through a local `const`, e.g. `const styled = baseStyled as ThemedSC<...>`.
// After type-stripping, Babel sees a plain `const styled = baseStyled`.
// The detector must follow such single-identifier aliases so `styled.div` is
// still recognized as a styled-component declaration.
import baseStyled from 'styled-components'

const styled = baseStyled

const Foo = styled.div`
  color: red;
`

const Bar = styled('span')`
  color: blue;
`

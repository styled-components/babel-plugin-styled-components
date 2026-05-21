// Regression: when the user already chains a `.withConfig(...)` with a
// non-literal argument (e.g. `withConfig(getConfig())`), the plugin appends
// its own `.withConfig({ displayName, componentId })` rather than skipping
// augmentation altogether.
import styled from 'styled-components'

const getConfig = () => ({ shouldForwardProp: () => true })

const Foo = styled.div.withConfig(getConfig())`
  color: red;
`

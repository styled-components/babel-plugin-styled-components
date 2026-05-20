// Regression: taggedTagAlreadyConfigured must tolerate non-ObjectProperty
// entries in a withConfig argument's `.properties` array (e.g. SpreadElement)
// and non-Identifier keys (e.g. StringLiteral). The pre-numbering pass runs
// on user-written styled components whose tags may already carry such
// withConfig shapes, and reading `.key.name` blindly would crash.
import styled from 'styled-components'

const baseConfig = { displayName: 'Base', shouldForwardProp: () => true }

const Spread = styled.div.withConfig({ ...baseConfig })`color: red;`
const StringKey = styled.div.withConfig({ 'shouldForwardProp': () => true })`color: blue;`

const App = () => <span css="color: green;" />

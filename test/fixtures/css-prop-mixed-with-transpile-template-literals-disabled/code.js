// Regression: with transpileTemplateLiterals: false, the css-prop pre-numbering
// pass and the main TaggedTemplateExpression visitor both fire on the same
// user-written styled component. displayNameAndId must be idempotent on a
// TaggedTemplate whose tag already carries .withConfig — otherwise the tag is
// wrapped with a fresh .withConfig on each pass and componentId counters
// increment each time.
import styled from 'styled-components'

const Plain = styled.div`color: red;`
const Wrapped = styled(Plain)`color: green;`

const App = () => <div css="color: blue;" />

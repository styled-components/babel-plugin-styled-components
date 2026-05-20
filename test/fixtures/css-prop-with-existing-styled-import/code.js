// Regression: when a styled default import already exists, repeated css-prop
// transformations within a file must not poison the import-detection cache.
// Every user-written styled component should keep its displayName/componentId,
// and every css-prop-injected component should also receive them.
import styled from 'styled-components'

const Plain = styled.div`color: red;`

const Wrapped = styled(Plain)`color: blue;`

const A = () => <div css="color: green;" />
const B = () => <span css={`color: purple;`} />
const C = () => <p css={{ color: 'orange' }} />

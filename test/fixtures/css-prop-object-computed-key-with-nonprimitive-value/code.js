// Regression: when a css-prop object literal has a computed key AND a
// non-primitive value (e.g. an identifier binding), the reducer must
// preserve the computed flag on the rewritten ObjectProperty. Otherwise the
// output emits `{ p.$_css: getValue() }` instead of `{ [p.$_css]: getValue() }`,
// which is invalid syntax.
import styled from 'styled-components'

const colorKey = 'background-color'
const colorValue = 'tomato'

const Comp = props => (
  <div css={{ [colorKey]: colorValue }}>hi</div>
)

export default Comp

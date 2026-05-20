// Regression: when a css-prop object literal has a computed key AND a
// non-primitive value (e.g. an identifier binding), the reducer must
// preserve the computed flag on the rewritten ObjectProperty. Otherwise the
// output emits `{ p.$_css: getValue() }` instead of `{ [p.$_css]: getValue() }`,
// which is invalid syntax.
import styled from 'styled-components';
const colorKey = 'background-color';
const colorValue = 'tomato';
const Comp = props => <_StyledDiv $_css={colorKey} $_css2={colorValue}>hi</_StyledDiv>;
export default Comp;
var _StyledDiv = styled("div").withConfig({
  displayName: "code___StyledDiv",
  componentId: "sc-1wfag49-0"
})(p => ({
  [p.$_css]: p.$_css2
}));

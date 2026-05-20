// Regression: taggedTagAlreadyConfigured must tolerate non-ObjectProperty
// entries in a withConfig argument's `.properties` array (e.g. SpreadElement)
// and non-Identifier keys (e.g. StringLiteral). The pre-numbering pass runs
// on user-written styled components whose tags may already carry such
// withConfig shapes, and reading `.key.name` blindly would crash.
import styled from 'styled-components';
const baseConfig = {
  displayName: 'Base',
  shouldForwardProp: () => true
};
const Spread = styled.div.withConfig({
  ...baseConfig
}).withConfig({
  displayName: "code__Spread",
  componentId: "sc-41ty88-0"
})`color:red;`;
const StringKey = styled.div.withConfig({
  'shouldForwardProp': () => true
}).withConfig({
  displayName: "code__StringKey",
  componentId: "sc-41ty88-1"
})`color:blue;`;
const App = () => <_StyledSpan />;
var _StyledSpan = styled("span").withConfig({
  displayName: "code___StyledSpan",
  componentId: "sc-41ty88-2"
})`color:green;`;

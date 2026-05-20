// Regression: with transpileTemplateLiterals: false, the css-prop pre-numbering
// pass and the main TaggedTemplateExpression visitor both fire on the same
// user-written styled component. displayNameAndId must be idempotent on a
// TaggedTemplate whose tag already carries .withConfig — otherwise the tag is
// wrapped with a fresh .withConfig on each pass and componentId counters
// increment each time.
import styled from 'styled-components';
const Plain = styled.div.withConfig({
  displayName: "code__Plain",
  componentId: "sc-fatejb-0"
})`color:red;`;
const Wrapped = styled(Plain).withConfig({
  displayName: "code__Wrapped",
  componentId: "sc-fatejb-1"
})`color:green;`;
const App = () => <_StyledDiv />;
var _StyledDiv = styled("div").withConfig({
  displayName: "code___StyledDiv",
  componentId: "sc-fatejb-2"
})`color:blue;`;

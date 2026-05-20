// Regression: when a styled default import already exists, repeated css-prop
// transformations within a file must not poison the import-detection cache.
// Every user-written styled component should keep its displayName/componentId,
// and every css-prop-injected component should also receive them.
import styled from 'styled-components';
const Plain = styled.div.withConfig({
  displayName: "code__Plain",
  componentId: "sc-1jfre7l-0"
})(["color: red;"]);
const Wrapped = styled(Plain).withConfig({
  displayName: "code__Wrapped",
  componentId: "sc-1jfre7l-1"
})(["color: blue;"]);
const A = () => <_StyledDiv />;
const B = () => <_StyledSpan />;
const C = () => <_StyledP />;
var _StyledDiv = styled("div").withConfig({
  displayName: "code___StyledDiv",
  componentId: "sc-1jfre7l-2"
})(["color: green;"]);
var _StyledSpan = styled("span").withConfig({
  displayName: "code___StyledSpan",
  componentId: "sc-1jfre7l-3"
})(["color: purple;"]);
var _StyledP = styled("p").withConfig({
  displayName: "code___StyledP",
  componentId: "sc-1jfre7l-4"
})({
  color: 'orange'
});

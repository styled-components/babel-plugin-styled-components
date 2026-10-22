import _styled from "styled-components";
import * as styled from 'styled-components';
const Foo = () => null;
const Called = styled.default(Foo).withConfig({
  displayName: "code__Called",
  componentId: "sc-15447g-0"
})(["color:red;"]);
const App = () => <_StyledDiv />;
var _StyledDiv = _styled("div").withConfig({
  displayName: "code___StyledDiv",
  componentId: "sc-15447g-1"
})(["color:blue;"]);

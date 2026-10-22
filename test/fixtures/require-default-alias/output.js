const sc = require('styled-components');
const styled = sc.default;
const Tag = styled.div.withConfig({
  displayName: "code__Tag",
  componentId: "sc-oqdthy-0"
})(["color: red;"]);
const helper = styled.isStyledComponent(Tag);
const unknown = styled.somethingNew.withConfig({
  displayName: "code__unknown",
  componentId: "sc-oqdthy-1"
})(["color: blue;"]);

const sc = require('styled-components');
const styled = sc.default;
const Tag = styled.div.withConfig({
  displayName: "code__Tag",
  componentId: "sc-oqdthy-0"
})(["color: red;"]);
const helper = styled.isStyledComponent(Tag);
const unknown = styled.somethingNew`color: blue;`;

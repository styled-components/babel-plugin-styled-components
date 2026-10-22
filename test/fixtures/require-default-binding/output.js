const styled = require('styled-components').default;
const viaComputed = require('styled-components')['default'];
function Base(props) {
  return props.children || null;
}
const Tag = styled.div.withConfig({
  displayName: "code__Tag",
  componentId: "sc-1odpxj7-0"
})(["color: red;"]);
const Called = viaComputed(Base).withConfig({
  displayName: "code__Called",
  componentId: "sc-1odpxj7-1"
})(["color: blue;"]);
const helper = styled.isStyledComponent(Tag);
const unknown = styled.somethingNew.withConfig({
  displayName: "code__unknown",
  componentId: "sc-1odpxj7-2"
})(["color: green;"]);

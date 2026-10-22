const sc = require('styled-components');
function Base(props) {
  return props.children || null;
}
const Comp = sc.default.div.withConfig({
  displayName: "code__Comp",
  componentId: "sc-9r4q5l-0"
})(["color: red;"]);
const n = typeof sc.somethingNew === 'function' ? sc.somethingNew.withConfig({
  displayName: "code__n",
  componentId: "sc-9r4q5l-1"
})(Base) : null;
const Ghost = sc.somethingNew.withConfig({
  displayName: "code__Ghost",
  componentId: "sc-9r4q5l-2"
})(["color: blue;"]);

const sc = require('styled-components');
function make(sc) {
  return sc.div`color: red;`;
}
const Comp = make({
  div: s => () => null
});
const Real = sc.default.div.withConfig({
  displayName: "code__Real",
  componentId: "sc-1xotko2-0"
})(["color: blue;"]);

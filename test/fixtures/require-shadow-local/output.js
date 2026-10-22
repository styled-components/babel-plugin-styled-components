const sc = require('styled-components');
function make() {
  const sc = {
    div: s => () => null
  };
  return sc.div`color: red;`;
}
function other() {
  const sc = {
    box: s => () => null
  };
  return sc.box`color: blue;`;
}
const Comp = make();
const Other = other();
const Real = sc.default.div.withConfig({
  displayName: "code__Real",
  componentId: "sc-1tv6n6c-0"
})(["color: green;"]);

let sc = require('styled-components');
const Before = sc.div.withConfig({
  displayName: "code__Before",
  componentId: "sc-m6xnle-0"
})(["color: red;"]);

// The function can run after `sc` is replaced, so this stays plain.
function writtenAbove() {
  return sc.span`color: blue;`;
}
sc = {
  div: s => () => null,
  span: s => () => null
};
const After = sc.div`color: green;`;
const Late = writtenAbove();

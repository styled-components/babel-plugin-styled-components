const sc = require('styled-components');
const name = 'css';
const alias = name;
const tag = 'box';
const css = 'div';
let dynamic = 'css';
const Skipped = sc[name]`color: red;`;
const SkippedAlias = sc[alias]`color: blue;`;
const SkippedTpl = sc[`css`]`color: green;`;
const SkippedDefault = sc.default[name]`color: orange;`;
const ViaDiv = sc[css].withConfig({
  displayName: "code__ViaDiv",
  componentId: "sc-1v8m2kx-0"
})(["color: purple;"]);
const Tag = sc[tag].withConfig({
  displayName: "code__Tag",
  componentId: "sc-1v8m2kx-1"
})(["color: pink;"]);
// A key that is not a const string stays decorated, even when its runtime
// value is a helper. `let` and `var` are not folded.
const Dynamic = sc[dynamic].withConfig({
  displayName: "code__Dynamic",
  componentId: "sc-1v8m2kx-2"
})(["color: black;"]);

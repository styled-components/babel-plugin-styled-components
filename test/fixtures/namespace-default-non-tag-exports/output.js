import * as ns from 'styled-components';
const Tagged = ns.default.div.withConfig({
  displayName: "code__Tagged",
  componentId: "sc-18vnb1u-0"
})(["color: red;"]);
const ok = ns.default.isStyledComponent(Tagged);
const theme = ns.default['createTheme']({});
const viaComputed = ns['isStyledComponent'](Tagged);
const Also = ns.default['div'].withConfig({
  displayName: "code__Also",
  componentId: "sc-18vnb1u-1"
})(["color: blue;"]);
const helperCss = ns.default.css`color: green;`;
const helperComputed = ns['css']`color: purple;`;

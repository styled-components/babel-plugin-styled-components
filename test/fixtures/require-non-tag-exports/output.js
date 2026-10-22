const sc = require('styled-components');
const A = sc.div.withConfig({
  displayName: "code__A",
  componentId: "sc-c84c7x-0"
})(["color: red;"]);
const B = sc.default.div.withConfig({
  displayName: "code__B",
  componentId: "sc-c84c7x-1"
})(["color: blue;"]);
const ok = sc.isStyledComponent(A);
const theme = sc.createTheme({});
const extracted = sc.extractCSS();
const sheet = sc.toStyleSheet();
const factory = sc.styled(A);
const viaDefault = sc.default.isStyledComponent(A);
const viaComputed = sc['isStyledComponent'](A);
const themeComputed = sc.default['createTheme']({});
const C = sc['div'].withConfig({
  displayName: "code__C",
  componentId: "sc-c84c7x-2"
})(["color: green;"]);
const D = sc.default['div'].withConfig({
  displayName: "code__D",
  componentId: "sc-c84c7x-3"
})(["color: orange;"]);
const helperCss = sc['css']`color: purple;`;
const helperDefaultCss = sc.default.css`color: pink;`;
const helperKeyframes = sc['keyframes']`from { opacity: 0; } to { opacity: 1; }`;

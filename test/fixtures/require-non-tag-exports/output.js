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

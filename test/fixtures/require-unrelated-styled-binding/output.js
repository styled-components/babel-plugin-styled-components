const sc = require('styled-components');
const styled = {
  box: s => () => null
};
const Comp = sc.default.div.withConfig({
  displayName: "code__Comp",
  componentId: "sc-1rj7i4r-0"
})(["color: red;"]);
const Other = styled.box`color: blue;`;

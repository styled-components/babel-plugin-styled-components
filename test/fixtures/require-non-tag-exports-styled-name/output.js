const styled = require('styled-components');
const x = () => null;
const ok = styled.isStyledComponent(x);
const theme = styled.createTheme({});
const extracted = styled.extractCSS();
const Tag = styled.div.withConfig({
  displayName: "code__Tag",
  componentId: "sc-w432we-0"
})(["color: red;"]);

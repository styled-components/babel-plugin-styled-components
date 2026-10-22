const styled = require('styled-components');
const x = () => null;
const ok = styled.isStyledComponent(x);
const theme = styled.createTheme({});
const extracted = styled.extractCSS();
const Tag = styled.div.withConfig({
  displayName: "code__Tag",
  componentId: "sc-w432we-0"
})(["color: red;"]);
const Box = styled.box.withConfig({
  displayName: "code__Box",
  componentId: "sc-w432we-1"
})(["color: blue;"]);
const Foo = styled.foo.withConfig({
  displayName: "code__Foo",
  componentId: "sc-w432we-2"
})(["color: green;"]);
const Filter = styled.feNotAFilter.withConfig({
  displayName: "code__Filter",
  componentId: "sc-w432we-3"
})(["color: orange;"]);
const Marquee = styled.marquee.withConfig({
  displayName: "code__Marquee",
  componentId: "sc-w432we-4"
})(["color: purple;"]);
const helperCss = styled.css`color: pink;`;
const helperKeyframes = styled.keyframes`from { opacity: 0; } to { opacity: 1; }`;
const helperGlobal = styled.createGlobalStyle`body { margin: 0; }`;
const helperComputed = styled['createGlobalStyle']`body { margin: 0; }`;
const owned = styled.hasOwnProperty('div');
const text = String(styled.toString());
const helperDefaultCss = styled.default.css`color: black;`;

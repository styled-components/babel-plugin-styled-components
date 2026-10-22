const sc = require('styled-components');
const Foo = () => null;
const Global = styled(Foo).withConfig({
  displayName: "code__Global",
  componentId: "sc-fr2vfw-0"
})(["color: red;"]);
const Member = sc.default.h1.withConfig({
  displayName: "code__Member",
  componentId: "sc-fr2vfw-1"
})(["color: blue;"]);
const Called = sc.default(Foo).withConfig({
  displayName: "code__Called",
  componentId: "sc-fr2vfw-2"
})(["color: green;"]);
const Direct = sc(Foo).withConfig({
  displayName: "code__Direct",
  componentId: "sc-fr2vfw-3"
})(["color: black;"]);

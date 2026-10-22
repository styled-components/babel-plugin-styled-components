import * as styled from 'styled-components';
const Foo = () => null;
const Called = styled.default(Foo).withConfig({
  displayName: "code__Called",
  componentId: "sc-1rd8nhx-0"
})(["color: red;"]);
const CalledObject = styled.default(Foo).withConfig({
  displayName: "code__CalledObject",
  componentId: "sc-1rd8nhx-1"
})({
  color: 'blue'
});
const CalledChained = styled.default(Foo).attrs({}).withConfig({
  displayName: "code__CalledChained",
  componentId: "sc-1rd8nhx-2"
})(["color: green;"]);
const CalledSequence = (0, styled.default)(Foo).withConfig({
  displayName: "code__CalledSequence",
  componentId: "sc-1rd8nhx-3"
})(["color: red;"]);
const Tagged = styled.default.div.withConfig({
  displayName: "code__Tagged",
  componentId: "sc-1rd8nhx-4"
})(["color: red;"]);

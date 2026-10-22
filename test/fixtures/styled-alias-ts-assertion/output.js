import baseStyled from 'styled-components';
const styled = baseStyled as any;
const satisfied = baseStyled satisfies any;
const Foo = styled.div.withConfig({
  displayName: "code__Foo",
  componentId: "sc-o52rri-0"
})(["color: red;"]);
const Bar = satisfied.span.withConfig({
  displayName: "code__Bar",
  componentId: "sc-o52rri-1"
})(["color: blue;"]);
const helper = styled.isStyledComponent(Foo);

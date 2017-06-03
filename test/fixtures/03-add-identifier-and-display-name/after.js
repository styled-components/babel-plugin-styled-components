const Test = styled.div.withConfig({
  displayName: "Test",
  componentId: "s1bfs0bd-0"
})`width: 100%;`;
const Test2 = true ? styled.div.withConfig({
  displayName: "Test2",
  componentId: "s1bfs0bd-1"
})`` : styled.div.withConfig({
  displayName: "Test2",
  componentId: "s1bfs0bd-2"
})``;
const styles = { One: styled.div.withConfig({
    displayName: "One",
    componentId: "s1bfs0bd-3"
  })`` };
let Component;
Component = styled.div.withConfig({
  displayName: "Component",
  componentId: "s1bfs0bd-4"
})``;
const WrappedComponent = styled(Inner).withConfig({
  displayName: "WrappedComponent",
  componentId: "s1bfs0bd-5"
})``;

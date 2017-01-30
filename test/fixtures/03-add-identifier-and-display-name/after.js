const Test = styled.div.withConfig({
  displayName: "Test",
  componentId: "Test-SHORTID"
})`width: 100%;`;
const Test2 = true ? styled.div.withConfig({
  displayName: "Test2",
  componentId: "Test2-SHORTID"
})`` : styled.div.withConfig({
  displayName: "Test2",
  componentId: "Test2-SHORTID"
})``;
const styles = { One: styled.div.withConfig({
    displayName: "One",
    componentId: "One-SHORTID"
  })`` };
let Component;
Component = styled.div.withConfig({
  displayName: "Component",
  componentId: "Component-SHORTID"
})``;
const WrappedComponent = styled(Inner).withConfig({
  displayName: "WrappedComponent",
  componentId: "WrappedComponent-SHORTID"
})``;

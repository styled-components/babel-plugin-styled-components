const Test = styled.div.withConfig({
  displayName: "Test",
  componentId: "sc-1cza72q-0"
})`width:100%;`;
const Test2 = true ? styled.div.withConfig({
  displayName: "Test2",
  componentId: "sc-1cza72q-1"
})`` : styled.div.withConfig({
  displayName: "Test2",
  componentId: "sc-1cza72q-2"
})``;
const styles = {
  One: styled.div.withConfig({
    displayName: "One",
    componentId: "sc-1cza72q-3"
  })``
};
let Component;
Component = styled.div.withConfig({
  displayName: "Component",
  componentId: "sc-1cza72q-4"
})``;
const WrappedComponent = styled(Inner).withConfig({
  displayName: "WrappedComponent",
  componentId: "sc-1cza72q-5"
})``;

import { styled } from '@example/example';
const Test = styled.div.withConfig({
  displayName: "Test",
  componentId: "elhbfv-0"
})`width:100%;`;
const Test2 = true ? styled.div.withConfig({
  displayName: "Test2",
  componentId: "elhbfv-1"
})`` : styled.div.withConfig({
  displayName: "Test2",
  componentId: "elhbfv-2"
})``;
const styles = {
  One: styled.div.withConfig({
    displayName: "One",
    componentId: "elhbfv-3"
  })``
};
let Component;
Component = styled.div.withConfig({
  displayName: "Component",
  componentId: "elhbfv-4"
})``;
const WrappedComponent = styled(Inner).withConfig({
  displayName: "WrappedComponent",
  componentId: "elhbfv-5"
})``;

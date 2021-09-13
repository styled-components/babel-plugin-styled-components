import { styled } from '@example/styled-components/native';
const Test = styled.div.withConfig({
  displayName: "Test",
  componentId: "sc-qtkc3x-0"
})`width:100%;`;
const Test2 = true ? styled.div.withConfig({
  displayName: "Test2",
  componentId: "sc-qtkc3x-1"
})`` : styled.div.withConfig({
  displayName: "Test2",
  componentId: "sc-qtkc3x-2"
})``;
const styles = {
  One: styled.div.withConfig({
    displayName: "One",
    componentId: "sc-qtkc3x-3"
  })``
};
let Component;
Component = styled.div.withConfig({
  displayName: "Component",
  componentId: "sc-qtkc3x-4"
})``;
const WrappedComponent = styled(Inner).withConfig({
  displayName: "WrappedComponent",
  componentId: "sc-qtkc3x-5"
})``;

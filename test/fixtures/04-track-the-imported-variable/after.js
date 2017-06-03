import s from "styled-components";

const Test = s.div.withConfig({
  displayName: "Test",
  componentId: "hgukwa-0"
})`width: 100%;`;
const Test2 = true ? s.div.withConfig({
  displayName: "Test2",
  componentId: "hgukwa-1"
})`` : s.div.withConfig({
  displayName: "Test2",
  componentId: "hgukwa-2"
})``;
const styles = { One: s.div.withConfig({
    displayName: "One",
    componentId: "hgukwa-3"
  })`` };
let Component;
Component = s.div.withConfig({
  displayName: "Component",
  componentId: "hgukwa-4"
})``;
const WrappedComponent = s(Inner).withConfig({
  displayName: "WrappedComponent",
  componentId: "hgukwa-5"
})``;

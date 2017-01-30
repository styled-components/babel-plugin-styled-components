import s from "styled-components";

const Test = s.div.withConfig({
  displayName: "Test",
  componentId: "Test-SHORTID"
})`width: 100%;`;
const Test2 = true ? s.div.withConfig({
  displayName: "Test2",
  componentId: "Test2-SHORTID"
})`` : s.div.withConfig({
  displayName: "Test2",
  componentId: "Test2-SHORTID"
})``;
const styles = { One: s.div.withConfig({
    displayName: "One",
    componentId: "One-SHORTID"
  })`` };
let Component;
Component = s.div.withConfig({
  displayName: "Component",
  componentId: "Component-SHORTID"
})``;
const WrappedComponent = s(Inner).withConfig({
  displayName: "WrappedComponent",
  componentId: "WrappedComponent-SHORTID"
})``;

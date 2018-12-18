import s from "styled-components";
const Test = s.div.withConfig({
  displayName: "Test",
  componentId: "wyof43-0"
})`width:100%;`;
const Test2 = true ? s.div.withConfig({
  displayName: "Test2",
  componentId: "wyof43-1"
})`` : s.div.withConfig({
  displayName: "Test2",
  componentId: "wyof43-2"
})``;
const styles = {
  One: s.div.withConfig({
    displayName: "One",
    componentId: "wyof43-3"
  })``
};
let Component;
Component = s.div.withConfig({
  displayName: "Component",
  componentId: "wyof43-4"
})``;
const WrappedComponent = s(Inner).withConfig({
  displayName: "WrappedComponent",
  componentId: "wyof43-5"
})``;

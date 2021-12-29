import styledA from '@xstyled/styled-components/test';
import styledB from '@xstyled/styled-components-test';
import styledC from '@xstyled/styled-components';
const Test = styledA.div`
  width: 100%;
`;
const Test2 = true ? styledA.div`` : styledC.div.withConfig({
  componentId: "sc-1mlyrvc-0"
})``;
const styles = {
  One: styledA.div``
};
let Component;
Component = styledC.div.withConfig({
  componentId: "sc-1mlyrvc-1"
})``;
const WrappedComponent = styledC(Inner).withConfig({
  componentId: "sc-1mlyrvc-2"
})``;
const NoTransformComponent = styledB.div``;

import styled from "styled-components";

const Test = styled.div.withConfig({
  displayName: "before__Test",
  componentId: "s1x8c0g0-0"
})`color:red;`;
const before = styled.div.withConfig({
  displayName: "before",
  componentId: "s1x8c0g0-1"
})`color:blue;`;
styled.div.withConfig({
  displayName: "before",
  componentId: "s1x8c0g0-2"
})``;
export default styled.button.withConfig({
  displayName: "before",
  componentId: "s1x8c0g0-3"
})``;

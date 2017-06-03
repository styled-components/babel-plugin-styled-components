import styled from "styled-components";

const Test = styled.div.withConfig({
  displayName: "before__Test",
  componentId: "ot6eup-0"
})`color: red;`;
styled.div.withConfig({
  displayName: "before",
  componentId: "ot6eup-1"
})``;
export default styled.button.withConfig({
  displayName: "before",
  componentId: "ot6eup-2"
})``;

import styled from "styled-components";
const Test = styled.div.withConfig({
  displayName: "use-folder-name__Test",
  componentId: "sc-1lbi44x-0"
})`color:red;`;
const before = styled.div.withConfig({
  displayName: "use-folder-name__before",
  componentId: "sc-1lbi44x-1"
})`color:blue;`;
styled.div.withConfig({
  displayName: "use-folder-name",
  componentId: "sc-1lbi44x-2"
})``;
export default styled.button.withConfig({
  displayName: "use-folder-name",
  componentId: "sc-1lbi44x-3"
})``;

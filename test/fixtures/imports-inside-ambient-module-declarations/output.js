import styled from 'styled-components';
declare module 'my-theme' {
  import sc from 'styled-components';
  export const theme: typeof sc;
}
const Button = styled.div.withConfig({
  displayName: "code__Button",
  componentId: "sc-134nhji-0"
})`color:red;`;

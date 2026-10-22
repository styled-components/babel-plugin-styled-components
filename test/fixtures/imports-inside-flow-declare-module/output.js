import styled from 'styled-components';
declare module 'my-theme' {
  import typeof sc from 'styled-components';
  declare module.exports: sc
}
const Button = styled.div.withConfig({
  displayName: "code__Button",
  componentId: "sc-mn515o-0"
})`color:red;`;

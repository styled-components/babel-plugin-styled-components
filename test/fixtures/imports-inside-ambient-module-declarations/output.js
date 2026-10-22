import styled from 'styled-components';
declare module 'my-theme' {
  import sc from 'styled-components';
  export const theme: typeof sc;
}
const Button = styled.div`
  color: red;
`;

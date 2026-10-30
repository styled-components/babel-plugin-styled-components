import styled from 'styled-components';
const Foo = styled.div.withConfig({
  displayName: "Foo"
})`color: red;`;
const wrapped = <any> Foo;

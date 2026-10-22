import { css, styled as sc } from 'styled-components';
const Foo = sc.div`
  color: red;
`;
const Bar = sc('span')`
  color: blue;
`;
const mixin = css`
  color:   green;
`;

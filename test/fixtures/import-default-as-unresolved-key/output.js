import { default as s } from 'styled-components';
let dynamic = 'div';
const Comp = s[dynamic].withConfig({
  displayName: "code__Comp",
  componentId: "sc-gturdc-0"
})(["color: red;"]);

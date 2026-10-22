import { css, styled as sc } from 'styled-components';
const Foo = sc.div.withConfig({
  displayName: "Foo"
})`color:red;`;
const Bar = sc('span').withConfig({
  displayName: "Bar"
})`color:blue;`;
const mixin = css`color:green;`;

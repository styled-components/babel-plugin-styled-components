import styled from 'styled-components';
export const Component =
/*#__PURE__*/
styled.div.withConfig({
  displayName: "code__Component",
  componentId: "sc-1dsyazt-0"
})(["color:inherit;"]);

const helper = size => `${size}rem`;

const widthUnits = 'px';
const OtherComponent =
/*#__PURE__*/
styled(Component).withConfig({
  displayName: "code__OtherComponent",
  componentId: "sc-1dsyazt-1"
})(["font-size:", ";width:", ";height:", ";"],
/*#__PURE__*/
helper(2),
/*#__PURE__*/
`50${widthUnits}`, p => helper(p.height));

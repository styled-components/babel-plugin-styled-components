import sc from 'styled-components';
import { styled as s } from 'styled-components';
const FromDefault = sc.div.withConfig({
  displayName: "code__FromDefault",
  componentId: "sc-ijl2tq-0"
})(["color: red;"]);
const FromNamed = s.View.withConfig({
  displayName: "code__FromNamed",
  componentId: "sc-ijl2tq-1"
})(["color: blue;"]);
const helper = sc.isStyledComponent(FromDefault);
const unknown = s.somethingNew.withConfig({
  displayName: "code__unknown",
  componentId: "sc-ijl2tq-2"
})(["color: green;"]);
const owned = sc.hasOwnProperty('div');
const Box = sc.box.withConfig({
  displayName: "code__Box",
  componentId: "sc-ijl2tq-3"
})(["color: white;"]);
const Filter = s.feNotAFilter.withConfig({
  displayName: "code__Filter",
  componentId: "sc-ijl2tq-4"
})(["color: black;"]);
const helperCss = sc.css`color: pink;`;
const helperDefault = sc.default.css`color: teal;`;
const FromDefaultProxy = sc.default.marquee.withConfig({
  displayName: "code__FromDefaultProxy",
  componentId: "sc-ijl2tq-5"
})(["color: gray;"]);

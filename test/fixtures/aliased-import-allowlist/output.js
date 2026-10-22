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
const unknown = s.somethingNew`color: green;`;
const owned = sc.hasOwnProperty('div');

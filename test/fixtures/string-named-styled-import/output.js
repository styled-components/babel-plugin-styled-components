import { 'styled' as s } from 'styled-components';
const Tag = s.div.withConfig({
  displayName: "code__Tag",
  componentId: "sc-2s7ou2-0"
})(["color: red;"]);
const helper = s.isStyledComponent(Tag);
const unknown = s.somethingNew.withConfig({
  displayName: "code__unknown",
  componentId: "sc-2s7ou2-1"
})(["color: blue;"]);

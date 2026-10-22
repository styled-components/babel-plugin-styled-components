import * as ns from 'styled-components';
function Base(props) {
  return props.children || null;
}
const Called = ns(Base).withConfig({
  displayName: "code__Called",
  componentId: "sc-p2vwnu-0"
})(["color: red;"]);
const ViaComputed = ns['default'](Base).withConfig({
  displayName: "code__ViaComputed",
  componentId: "sc-p2vwnu-1"
})(["color: blue;"]);
const Tag = ns.div.withConfig({
  displayName: "code__Tag",
  componentId: "sc-p2vwnu-2"
})(["color: green;"]);
const helper = ns.isStyledComponent(Tag);
const renamed = ns.default;
const Aliased = renamed.span.withConfig({
  displayName: "code__Aliased",
  componentId: "sc-p2vwnu-3"
})(["color: purple;"]);
const unknown = renamed.somethingNew.withConfig({
  displayName: "code__unknown",
  componentId: "sc-p2vwnu-4"
})(["color: black;"]);
const Proxy = ns.box.withConfig({
  displayName: "code__Proxy",
  componentId: "sc-p2vwnu-5"
})(["color: white;"]);
const skipped = ns.css`color: yellow;`;

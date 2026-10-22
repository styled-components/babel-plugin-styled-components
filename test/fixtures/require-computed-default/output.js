const sc = require('styled-components');
function Base(props) {
  return props.children || null;
}
const Tagged = sc['default'].div.withConfig({
  displayName: "code__Tagged",
  componentId: "sc-nrtf10-0"
})(["color: red;"]);
const Called = sc['default'](Base).withConfig({
  displayName: "code__Called",
  componentId: "sc-nrtf10-1"
})(["color: blue;"]);
const ObjectCalled = sc['default'](Base).withConfig({
  displayName: "code__ObjectCalled",
  componentId: "sc-nrtf10-2"
})({
  color: 'green'
});

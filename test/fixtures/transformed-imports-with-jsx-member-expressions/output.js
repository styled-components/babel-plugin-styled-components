"use strict";

var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _react = _interopRequireDefault(require("react"));
var _icons = _interopRequireDefault(require("./icons"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const someCss = (0, _styledComponents.css)([" background:purple;"]);
const App1 = () => {
  return <_StyledIcons />;
};
const App2 = () => {
  return <_StyledIconsFoo />;
};
const App3 = () => {
  return <_StyledIconsFooBar />;
};
var _StyledIcons = (0, _styledComponents.default)(_icons.default).withConfig({
  displayName: "code___StyledIcons",
  componentId: "sc-1wxehft-0"
})(["", ""], someCss);
var _StyledIconsFoo = (0, _styledComponents.default)(_icons.default.Foo).withConfig({
  displayName: "code___StyledIconsFoo",
  componentId: "sc-1wxehft-1"
})(["", ""], someCss);
var _StyledIconsFooBar = (0, _styledComponents.default)(_icons.default.Foo.Bar).withConfig({
  displayName: "code___StyledIconsFooBar",
  componentId: "sc-1wxehft-2"
})(["", ""], someCss);

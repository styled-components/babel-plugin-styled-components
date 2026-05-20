"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _styledComponents = _interopRequireWildcard(require("styled-components"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Named = _styledComponents["default"].div.withConfig({
  displayName: "code__Named"
})(["\n  width: 100%;\n"]);
var NamedWithInterpolation = _styledComponents["default"].div.withConfig({
  displayName: "code__NamedWithInterpolation"
})(["\n  color: ", ";\n"], function (color) {
  return props.color;
});
var Wrapped = (0, _styledComponents["default"])(Inner).withConfig({
  displayName: "code__Wrapped"
})(["\n  color: red;\n"]);
var Foo = _styledComponents["default"].div.withConfig({
  displayName: "code__Foo"
})({
  color: 'green'
});
var style = (0, _styledComponents.css)(["\n  background: green;\n"]);
var GlobalStyle = (0, _styledComponents.createGlobalStyle)(["\n  html {\n    background: silver;\n  }\n"]);

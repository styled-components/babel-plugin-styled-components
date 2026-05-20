"use strict";

var _styledComponents = _interopRequireDefault(require("styled-components"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var Simple = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["width:100%;"])));
var Interpolation = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["content:\"  ", "  \";"])), function (props) {
  return props.text;
});
var SpecialCharacters = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["content:\"  ", "  \";color:red;"])), function (props) {
  return props.text;
});
var Comment = _styledComponents["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["color:red;"])));
var Parens = _styledComponents["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["&:hover{color:blue;}"])));

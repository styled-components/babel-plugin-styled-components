"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _react = _interopRequireDefault(require("react"));
var _Card = _interopRequireDefault(require("../../shared/components/Card"));
var _config = _interopRequireDefault(require("../../../config"));
var _templateObject; // @flow
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var _default = exports["default"] = function _default() {
  return <_StyledDiv>
    <_Card.default>
      <h1>Login or Sign Up</h1>
      <p>
        <a href={_config["default"].API_URI + '/auth/google'}>
          Sign up or login with Google
        </a>
      </p>
    </_Card.default>
  </_StyledDiv>;
};
var _StyledDiv = (0, _styledComponents["default"])("div")(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      width: 35em;\n    "])));

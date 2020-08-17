"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react = _interopRequireDefault(require("react"));

var _Card = _interopRequireDefault(require("../../shared/components/Card"));

var _config = _interopRequireDefault(require("../../../config"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = function _default() {
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

exports["default"] = _default;

var _StyledDiv = (0, _styledComponents["default"])("div")(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      width: 35em;\n    "])));

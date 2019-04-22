"use strict";

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * control
 */
var Thing = _styledComponents["default"].div.withConfig({
  displayName: "code__Thing",
  componentId: "sc-7evkve-0"
})(["color:red;"]);

var Thing2 = (0, _styledComponents["default"])(Thing).withConfig({
  displayName: "code__Thing2",
  componentId: "sc-7evkve-1"
})(["background:blue;"]);
/*
 * Basic fixtures
 */

var StaticString = function StaticString(p) {
  return <_StyledP>A</_StyledP>;
};

var StaticTemplate = function StaticTemplate(p) {
  return <_StyledP2>
    A
  </_StyledP2>;
};

var ObjectProp = function ObjectProp(p) {
  return <_StyledP3>A</_StyledP3>;
};

var NoChildren = function NoChildren(p) {
  return <_StyledP4 />;
};

var CssHelperProp = function CssHelperProp(p) {
  return <_StyledP5>
    A
  </_StyledP5>;
};
/*
 * Dynamic prop
 */


var CustomComp = function CustomComp(p) {
  return <_StyledParagraph>H</_StyledParagraph>;
};

var DynamicProp = function DynamicProp(p) {
  return <_StyledP6 _css={props.cssText}>H</_StyledP6>;
};

var LocalInterpolation = function LocalInterpolation(p) {
  return <_StyledP7 _css2={props.bg}>
    H
  </_StyledP7>;
};

var FuncInterpolation = function FuncInterpolation(p) {
  return <_StyledP8>
    H
  </_StyledP8>;
};

var radius = 10;

var GlobalInterpolation = function GlobalInterpolation(p) {
  return <_StyledP9>
    H
  </_StyledP9>;
};

var LocalCssHelperProp = function LocalCssHelperProp(p) {
  return <_StyledP10 _css3={p.color}>
    A
  </_StyledP10>;
};

var DynamicCssHelperProp = function DynamicCssHelperProp(p) {
  return <_StyledP11>
    A
  </_StyledP11>;
};

var CustomCompWithDot = function CustomCompWithDot(p) {
  return <_StyledButtonGhost>H</_StyledButtonGhost>;
};

var NestedCompWithDot = function NestedCompWithDot(p) {
  return <_StyledButtonGhostNew>H</_StyledButtonGhostNew>;
};

var CustomCompWithDotLowerCase = function CustomCompWithDotLowerCase(p) {
  return <_StyledButtonGhost2>H</_StyledButtonGhost2>;
};

var _StyledP = _styledComponents["default"].p.withConfig({
  displayName: "code___StyledP",
  componentId: "sc-7evkve-2"
})(["flex:1;"]);

var _StyledP2 = _styledComponents["default"].p.withConfig({
  displayName: "code___StyledP2",
  componentId: "sc-7evkve-3"
})(["flex:1;"]);

var _StyledP3 = _styledComponents["default"].p.withConfig({
  displayName: "code___StyledP3",
  componentId: "sc-7evkve-4"
})({
  color: 'blue'
});

var _StyledP4 = _styledComponents["default"].p.withConfig({
  displayName: "code___StyledP4",
  componentId: "sc-7evkve-5"
})(["flex:1;"]);

var _StyledP5 = _styledComponents["default"].p.withConfig({
  displayName: "code___StyledP5",
  componentId: "sc-7evkve-6"
})(["color:blue;"]);

var _StyledParagraph = (0, _styledComponents["default"])(Paragraph).withConfig({
  displayName: "code___StyledParagraph",
  componentId: "sc-7evkve-7"
})(["flex:1"]);

var _StyledP6 = _styledComponents["default"].p.withConfig({
  displayName: "code___StyledP6",
  componentId: "sc-7evkve-8"
})(["", ""], function (p) {
  return p._css;
});

var _StyledP7 = _styledComponents["default"].p.withConfig({
  displayName: "code___StyledP7",
  componentId: "sc-7evkve-9"
})(["background:", ";"], function (p) {
  return p._css2;
});

var _StyledP8 = _styledComponents["default"].p.withConfig({
  displayName: "code___StyledP8",
  componentId: "sc-7evkve-10"
})(["color:", ";"], function (props) {
  return props.theme.a;
});

var _StyledP9 = _styledComponents["default"].p.withConfig({
  displayName: "code___StyledP9",
  componentId: "sc-7evkve-11"
})(["border-radius:", "px;"], radius);

var _StyledP10 = _styledComponents["default"].p.withConfig({
  displayName: "code___StyledP10",
  componentId: "sc-7evkve-12"
})(["color:", ";"], function (p) {
  return p._css3;
});

var _StyledP11 = _styledComponents["default"].p.withConfig({
  displayName: "code___StyledP11",
  componentId: "sc-7evkve-13"
})(["color:", ";"], function (props) {
  return props.theme.color;
});

var _StyledButtonGhost = (0, _styledComponents["default"])(Button.Ghost).withConfig({
  displayName: "code___StyledButtonGhost",
  componentId: "sc-7evkve-14"
})(["flex:1"]);

var _StyledButtonGhostNew = (0, _styledComponents["default"])(Button.Ghost.New).withConfig({
  displayName: "code___StyledButtonGhostNew",
  componentId: "sc-7evkve-15"
})(["flex:1"]);

var _StyledButtonGhost2 = (0, _styledComponents["default"])(button.ghost).withConfig({
  displayName: "code___StyledButtonGhost2",
  componentId: "sc-7evkve-16"
})(["flex:1"]);

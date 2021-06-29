"use strict";

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _StyledP = (0, _styledComponents["default"])("p")(_templateObject || (_templateObject = _taggedTemplateLiteral(["flex: 1;"])));

/*
 * Basic fixtures
 */
var StaticString = function StaticString(p) {
  return <_StyledP>A</_StyledP>;
};

var _StyledP2 = (0, _styledComponents["default"])("p")(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      flex: 1;\n    "])));

var StaticTemplate = function StaticTemplate(p) {
  return <_StyledP2>
    A
  </_StyledP2>;
};

var _StyledP3 = (0, _styledComponents["default"])("p")({
  color: 'blue'
});

var ObjectProp = function ObjectProp(p) {
  return <_StyledP3>A</_StyledP3>;
};

var _StyledP4 = (0, _styledComponents["default"])("p")(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["flex: 1;"])));

var NoChildren = function NoChildren(p) {
  return <_StyledP4 />;
};

var _StyledP5 = (0, _styledComponents["default"])("p")(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n      color: blue;\n    "])));

var CssHelperProp = function CssHelperProp(p) {
  return <_StyledP5>
    A
  </_StyledP5>;
};
/*
 * Dynamic prop
 */


var _StyledParagraph = (0, _styledComponents["default"])(Paragraph)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["flex: 1"])));

var CustomComp = function CustomComp(p) {
  return <_StyledParagraph>H</_StyledParagraph>;
};

var _StyledP6 = (0, _styledComponents["default"])("p")(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["", ""])), function (p) {
  return p._css;
});

var DynamicProp = function DynamicProp(p) {
  return <_StyledP6 _css={props.cssText}>H</_StyledP6>;
};

var _StyledP7 = (0, _styledComponents["default"])("p")(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n      background: ", ";\n    "])), function (p) {
  return p._css2;
});

var LocalInterpolation = function LocalInterpolation(p) {
  return <_StyledP7 _css2={props.bg}>
    H
  </_StyledP7>;
};

var _StyledP8 = (0, _styledComponents["default"])("p")(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n      color: ", ";\n    "])), function (props) {
  return props.theme.a;
});

var FuncInterpolation = function FuncInterpolation(p) {
  return <_StyledP8>
    H
  </_StyledP8>;
};

var radius = 10;

var _StyledP9 = (0, _styledComponents["default"])("p")(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n      border-radius: ", "px;\n    "])), radius);

var GlobalInterpolation = function GlobalInterpolation(p) {
  return <_StyledP9>
    H
  </_StyledP9>;
};

var _StyledP10 = (0, _styledComponents["default"])("p")(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n      color: ", ";\n    "])), function (p) {
  return p._css3;
});

var LocalCssHelperProp = function LocalCssHelperProp(p) {
  return <_StyledP10 _css3={p.color}>
    A
  </_StyledP10>;
};

var _StyledP11 = (0, _styledComponents["default"])("p")(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n      color: ", ";\n    "])), function (props) {
  return props.theme.color;
});

var DynamicCssHelperProp = function DynamicCssHelperProp(p) {
  return <_StyledP11>
    A
  </_StyledP11>;
};

var _StyledButtonGhost = (0, _styledComponents["default"])(Button.Ghost)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["flex: 1"])));

var CustomCompWithDot = function CustomCompWithDot(p) {
  return <_StyledButtonGhost>H</_StyledButtonGhost>;
};

var _StyledButtonGhostNew = (0, _styledComponents["default"])(Button.Ghost.New)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["flex: 1"])));

var NestedCompWithDot = function NestedCompWithDot(p) {
  return <_StyledButtonGhostNew>H</_StyledButtonGhostNew>;
};

var _StyledButtonGhost2 = (0, _styledComponents["default"])(button.ghost)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["flex: 1"])));

var CustomCompWithDotLowerCase = function CustomCompWithDotLowerCase(p) {
  return <_StyledButtonGhost2>H</_StyledButtonGhost2>;
};

var _StyledButtonGhost3 = (0, _styledComponents["default"])("button-ghost")(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["flex: 1"])));

var CustomElement = function CustomElement(p) {
  return <_StyledButtonGhost3>H</_StyledButtonGhost3>;
};
/* styled component defined after function it's used in */


var EarlyUsageComponent = function EarlyUsageComponent(p) {
  return <_StyledThing />;
};

var Thing3 = styled.div(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n  color: blue;\n"])));

var _StyledThing2 = (0, _styledComponents["default"])(Thing3)(function (p) {
  return {
    color: p._css5
  };
});

var _StyledThing = (0, _styledComponents["default"])(Thing3)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["color: red;"])));

var _StyledP12 = (0, _styledComponents["default"])("p")(function (p) {
  return {
    color: p._css4
  };
});

var ObjectInterpolation = function ObjectInterpolation(p) {
  var theme = useTheme();
  return <_StyledP12 _css4={theme.colors.red}>
    H
  </_StyledP12>;
};

var ObjectInterpolationCustomComponent = function ObjectInterpolationCustomComponent(p) {
  var theme = useTheme();
  return <_StyledThing2 _css5={theme.colors.red}>
    H
  </_StyledThing2>;
};

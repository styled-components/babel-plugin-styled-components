"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _excluded = ["bg", "content", "height", "width"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject0, _templateObject1, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
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
  return <_StyledP6 $_css={props.cssText}>H</_StyledP6>;
};
var LocalInterpolation = function LocalInterpolation(p) {
  return <_StyledP7 $_css2={props.bg}>
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
  return <_StyledP0 $_css3={p.color}>
    A
  </_StyledP0>;
};
var DynamicCssHelperProp = function DynamicCssHelperProp(p) {
  return <_StyledP1>
    A
  </_StyledP1>;
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
var CustomElement = function CustomElement(p) {
  return <_StyledButtonGhost3>H</_StyledButtonGhost3>;
};

/* styled component defined after function it's used in */

var EarlyUsageComponent = function EarlyUsageComponent(p) {
  return <_StyledThing />;
};
var Thing3 = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: blue;\n"])));
var _StyledThing5 = (0, _styledComponents["default"])(Thing3)(function (p) {
  return _defineProperty({}, p.$_css8, {
    color: 'red'
  });
});
var _StyledThing4 = (0, _styledComponents["default"])(Thing3)(function (p) {
  return _defineProperty({}, p.$_css7, {
    color: 'red'
  });
});
var _StyledThing3 = (0, _styledComponents["default"])(Thing3)(function (p) {
  return _defineProperty({}, p.$_css6, {
    color: 'red'
  });
});
var _StyledThing2 = (0, _styledComponents["default"])(Thing3)(function (p) {
  return {
    color: p.$_css5
  };
});
var _StyledThing = (0, _styledComponents["default"])(Thing3)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["color: red;"])));
var ObjectInterpolation = function ObjectInterpolation(p) {
  var theme = useTheme();
  return <_StyledP10 $_css4={theme.colors.red}>
      H
    </_StyledP10>;
};
var ObjectInterpolationCustomComponent = function ObjectInterpolationCustomComponent(p) {
  var theme = useTheme();
  return <_StyledThing2 $_css5={theme.colors.red}>
      H
    </_StyledThing2>;
};
var ObjectInterpolationInKey = function ObjectInterpolationInKey(p) {
  var theme = useTheme();
  return <_StyledThing3 $_css6={theme.breakpoints.md}>
      H
    </_StyledThing3>;
};
var ObjectFnInterpolationInKey = function ObjectFnInterpolationInKey(p) {
  var theme = useTheme();
  return <_StyledThing4 $_css7={theme.breakpoints.md()}>
      H
    </_StyledThing4>;
};
var ObjectFnSimpleInterpolationInKey = function ObjectFnSimpleInterpolationInKey(p) {
  var foo = '@media screen and (max-width: 600px)';
  return <_StyledThing5 $_css8={foo}>
      H
    </_StyledThing5>;
};
var ObjectPropMixedInputs = function ObjectPropMixedInputs(p) {
  var color = 'red';
  return <_StyledP11 $_css9={p.background} $_css0={color} $_css1={globalVar} $_css10={getAfterValue()}>
      A
    </_StyledP11>;
};
var ObjectPropWithSpread = function ObjectPropWithSpread() {
  var css = {
    color: 'red'
  };
  var playing = true;
  return <_StyledDiv $_css11={css} $_css12={playing ? {
    opacity: 0,
    bottom: '-100px'
  } : {}} />;
};
var ObjectInterpolationLogical = function ObjectInterpolationLogical(_ref4) {
  var bg = _ref4.bg,
    content = _ref4.content,
    height = _ref4.height,
    width = _ref4.width,
    p = _objectWithoutProperties(_ref4, _excluded);
  return <_StyledP12 {...p} $_css13={bg || 'red'} $_css14={height !== null && height !== void 0 ? height : '100%'} $_css15={width ? "".concat(width, "px") : '100%'} $_css16={content}>
      H
    </_StyledP12>;
};
var ObjectInterpolationMember = function ObjectInterpolationMember(p) {
  var theme = useTheme();
  var color = 'red';
  return <_StyledP13 $_css17={theme.colors[color]}>
      H
    </_StyledP13>;
};
var RenderPropComponentCSSProp = function RenderPropComponentCSSProp() {
  return <RenderPropComponent>
      {function () {
      return <_StyledDiv2 />;
    }}
    </RenderPropComponent>;
};
var RenderPropComponentSpread = function RenderPropComponentSpread(props) {
  return <RenderPropComponent>
      {function () {
      return <div {...props.derivedProps} />;
    }}
    </RenderPropComponent>;
};
var RenderPropComponentSpreadCSSProp = function RenderPropComponentSpreadCSSProp(props) {
  return <RenderPropComponent>
      {function () {
      return <_StyledDiv3 {...props.derivedProps} />;
    }}
    </RenderPropComponent>;
};
var _StyledP = (0, _styledComponents["default"])("p")(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["flex: 1;"])));
var _StyledP2 = (0, _styledComponents["default"])("p")(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n      flex: 1;\n    "])));
var _StyledP3 = (0, _styledComponents["default"])("p")({
  color: 'blue'
});
var _StyledP4 = (0, _styledComponents["default"])("p")(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["flex: 1;"])));
var _StyledP5 = (0, _styledComponents["default"])("p")(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n      color: blue;\n    "])));
var _StyledParagraph = (0, _styledComponents["default"])(Paragraph)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["flex: 1"])));
var _StyledP6 = (0, _styledComponents["default"])("p")(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["", ""])), function (p) {
  return p.$_css;
});
var _StyledP7 = (0, _styledComponents["default"])("p")(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n      background: ", ";\n    "])), function (p) {
  return p.$_css2;
});
var _StyledP8 = (0, _styledComponents["default"])("p")(_templateObject0 || (_templateObject0 = _taggedTemplateLiteral(["\n      color: ", ";\n    "])), function (props) {
  return props.theme.a;
});
var _StyledP9 = (0, _styledComponents["default"])("p")(_templateObject1 || (_templateObject1 = _taggedTemplateLiteral(["\n      border-radius: ", "px;\n    "])), radius);
var _StyledP0 = (0, _styledComponents["default"])("p")(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n      color: ", ";\n    "])), function (p) {
  return p.$_css3;
});
var _StyledP1 = (0, _styledComponents["default"])("p")(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n      color: ", ";\n    "])), function (props) {
  return props.theme.color;
});
var _StyledButtonGhost = (0, _styledComponents["default"])(Button.Ghost)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["flex: 1"])));
var _StyledButtonGhostNew = (0, _styledComponents["default"])(Button.Ghost.New)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["flex: 1"])));
var _StyledButtonGhost2 = (0, _styledComponents["default"])(button.ghost)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["flex: 1"])));
var _StyledButtonGhost3 = (0, _styledComponents["default"])("button-ghost")(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["flex: 1"])));
var _StyledP10 = (0, _styledComponents["default"])("p")(function (p) {
  return {
    color: p.$_css4
  };
});
var _StyledP11 = (0, _styledComponents["default"])("p")(function (p) {
  return {
    background: p.$_css9,
    color: p.$_css0,
    textAlign: 'left',
    '::before': {
      content: p.$_css1
    },
    '::after': {
      content: p.$_css10
    }
  };
});
var _StyledDiv = (0, _styledComponents["default"])("div")(function (p) {
  return _objectSpread(_objectSpread({}, p.$_css11), p.$_css12);
});
var _StyledP12 = (0, _styledComponents["default"])("p")(function (p) {
  return {
    background: p.$_css13,
    height: p.$_css14,
    width: p.$_css15,
    '::before': {
      content: p.$_css16
    }
  };
});
var _StyledP13 = (0, _styledComponents["default"])("p")(function (p) {
  return {
    color: p.$_css17
  };
});
var _StyledDiv2 = (0, _styledComponents["default"])("div")(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n            color: black;\n          "])));
var _StyledDiv3 = (0, _styledComponents["default"])("div")(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["\n            color: black;\n          "])));

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _excluded = ["bg", "content", "height", "width"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
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
  return <_StyledP10 $_css3={p.color}>
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
  return <_StyledP12 $_css4={theme.colors.red}>
      H
    </_StyledP12>;
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
  return <_StyledP13 $_css9={p.background} $_css10={color} $_css11={globalVar} $_css12={getAfterValue()}>
      A
    </_StyledP13>;
};
var ObjectPropWithSpread = function ObjectPropWithSpread() {
  var css = {
    color: 'red'
  };
  var playing = true;
  return <_StyledDiv $_css13={css} $_css14={playing ? {
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
  return <_StyledP14 {...p} $_css15={bg || 'red'} $_css16={height !== null && height !== void 0 ? height : '100%'} $_css17={width ? "".concat(width, "px") : '100%'} $_css18={content}>
      H
    </_StyledP14>;
};
var ObjectInterpolationMember = function ObjectInterpolationMember(p) {
  var theme = useTheme();
  var color = 'red';
  return <_StyledP15 $_css19={theme.colors[color]}>
      H
    </_StyledP15>;
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
var _StyledP8 = (0, _styledComponents["default"])("p")(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n      color: ", ";\n    "])), function (props) {
  return props.theme.a;
});
var _StyledP9 = (0, _styledComponents["default"])("p")(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n      border-radius: ", "px;\n    "])), radius);
var _StyledP10 = (0, _styledComponents["default"])("p")(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n      color: ", ";\n    "])), function (p) {
  return p.$_css3;
});
var _StyledP11 = (0, _styledComponents["default"])("p")(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n      color: ", ";\n    "])), function (props) {
  return props.theme.color;
});
var _StyledButtonGhost = (0, _styledComponents["default"])(Button.Ghost)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["flex: 1"])));
var _StyledButtonGhostNew = (0, _styledComponents["default"])(Button.Ghost.New)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["flex: 1"])));
var _StyledButtonGhost2 = (0, _styledComponents["default"])(button.ghost)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["flex: 1"])));
var _StyledButtonGhost3 = (0, _styledComponents["default"])("button-ghost")(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["flex: 1"])));
var _StyledP12 = (0, _styledComponents["default"])("p")(function (p) {
  return {
    color: p.$_css4
  };
});
var _StyledP13 = (0, _styledComponents["default"])("p")(function (p) {
  return {
    background: p.$_css9,
    color: p.$_css10,
    textAlign: 'left',
    '::before': {
      content: p.$_css11
    },
    '::after': {
      content: p.$_css12
    }
  };
});
var _StyledDiv = (0, _styledComponents["default"])("div")(function (p) {
  return _objectSpread(_objectSpread({}, p.$_css13), p.$_css14);
});
var _StyledP14 = (0, _styledComponents["default"])("p")(function (p) {
  return {
    background: p.$_css15,
    height: p.$_css16,
    width: p.$_css17,
    '::before': {
      content: p.$_css18
    }
  };
});
var _StyledP15 = (0, _styledComponents["default"])("p")(function (p) {
  return {
    color: p.$_css19
  };
});
var _StyledDiv2 = (0, _styledComponents["default"])("div")(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["\n            color: black;\n          "])));
var _StyledDiv3 = (0, _styledComponents["default"])("div")(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["\n            color: black;\n          "])));

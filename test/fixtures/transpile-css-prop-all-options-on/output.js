"use strict";

var _styledComponents = _interopRequireDefault(require("styled-components"));
var _SomeComponentPath = _interopRequireDefault(require("../SomeComponentPath"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require('../SomeOtherComponentPath'),
  SomeOtherComponent = _require.SomeOtherComponent;

/**
 * control
 */
var _StyledSomeOtherComponent = (0, _styledComponents["default"])(SomeOtherComponent).withConfig({
  displayName: "code___StyledSomeOtherComponent",
  componentId: "sc-7evkve-24"
})(["color:red;"]);
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
var globalVar = '"foo"';
var getAfterValue = function getAfterValue() {
  return '"bar"';
};
var ObjectPropMixedInputs = function ObjectPropMixedInputs(p) {
  var color = 'red';
  return <_StyledP10 $_css4={p.background} $_css5={color} $_css6={globalVar} $_css7={getAfterValue()}>
      A
    </_StyledP10>;
};
var SpreadObjectPropMixedInputs = function SpreadObjectPropMixedInputs(p) {
  var color = 'red';
  return <_StyledP11 $_css8={globalVar} $_css9={getAfterValue()} $_css0={globalVar} $_css1={getAfterValue()} $_css10={p.background} $_css11={globalVar} $_css12={getAfterValue()}>
      A
    </_StyledP11>;
};

/* styled component defined after function it's used in */

var EarlyUsageComponent = function EarlyUsageComponent(p) {
  return <_StyledThing />;
};
var Thing3 = _styledComponents["default"].div.withConfig({
  displayName: "code__Thing3",
  componentId: "sc-7evkve-2"
})(["color:blue;"]);
var _StyledThing6 = (0, _styledComponents["default"])(Thing3).withConfig({
  displayName: "code___StyledThing6",
  componentId: "sc-7evkve-29"
})(function (p) {
  return _defineProperty({}, p.$_css17, {
    color: 'red'
  });
});
var _StyledThing5 = (0, _styledComponents["default"])(Thing3).withConfig({
  displayName: "code___StyledThing5",
  componentId: "sc-7evkve-28"
})(function (p) {
  return _defineProperty({}, p.$_css16, {
    color: 'red'
  });
});
var _StyledThing4 = (0, _styledComponents["default"])(Thing3).withConfig({
  displayName: "code___StyledThing4",
  componentId: "sc-7evkve-27"
})(function (p) {
  return _defineProperty({}, p.$_css15, {
    color: 'red'
  });
});
var _StyledThing3 = (0, _styledComponents["default"])(Thing3).withConfig({
  displayName: "code___StyledThing3",
  componentId: "sc-7evkve-26"
})(function (p) {
  return {
    color: p.$_css14
  };
});
var _StyledThing = (0, _styledComponents["default"])(Thing3).withConfig({
  displayName: "code___StyledThing",
  componentId: "sc-7evkve-21"
})(["color:red;"]);
var EarlyUsageComponent2 = function EarlyUsageComponent2(p) {
  return <_StyledThing2 />;
};
function Thing4(props) {
  return <div {...props} />;
}

/* insert before usage for non-local scope styled HOC targets */
var _StyledThing2 = (0, _styledComponents["default"])(Thing4).withConfig({
  displayName: "code___StyledThing2",
  componentId: "sc-7evkve-22"
})(["color:red;"]);
var ImportedComponentUsage = function ImportedComponentUsage(p) {
  return <_StyledSomeComponent />;
};
var RequiredComponentUsage = function RequiredComponentUsage(p) {
  return <_StyledSomeOtherComponent />;
};
var ObjectInterpolation = function ObjectInterpolation(p) {
  var theme = useTheme();
  return <_StyledP12 $_css13={theme.colors.red}>
      H
    </_StyledP12>;
};
var ObjectInterpolationCustomComponent = function ObjectInterpolationCustomComponent(p) {
  var theme = useTheme();
  return <_StyledThing3 $_css14={theme.colors.red}>
      H
    </_StyledThing3>;
};
var ObjectInterpolationInKey = function ObjectInterpolationInKey(p) {
  var theme = useTheme();
  return <_StyledThing4 $_css15={theme.breakpoints.md}>
      H
    </_StyledThing4>;
};
var ObjectFnInterpolationInKey = function ObjectFnInterpolationInKey(p) {
  var theme = useTheme();
  return <_StyledThing5 $_css16={theme.breakpoints.md()}>
      H
    </_StyledThing5>;
};
var ObjectFnSimpleInterpolationInKey = function ObjectFnSimpleInterpolationInKey(p) {
  var foo = '@media screen and (max-width: 600px)';
  return <_StyledThing6 $_css17={foo}>
      H
    </_StyledThing6>;
};
var ObjectPropWithSpread = function ObjectPropWithSpread() {
  var css = {
    color: 'red'
  };
  var playing = true;
  return <_StyledDiv $_css18={css} $_css19={playing ? {
    opacity: 0,
    bottom: '-100px'
  } : {}} />;
};
var _StyledP = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP",
  componentId: "sc-7evkve-3"
})(["flex:1;"]);
var _StyledP2 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP2",
  componentId: "sc-7evkve-4"
})(["flex:1;"]);
var _StyledP3 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP3",
  componentId: "sc-7evkve-5"
})({
  color: 'blue'
});
var _StyledP4 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP4",
  componentId: "sc-7evkve-6"
})(["flex:1;"]);
var _StyledP5 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP5",
  componentId: "sc-7evkve-7"
})(["color:blue;"]);
var _StyledParagraph = (0, _styledComponents["default"])(Paragraph).withConfig({
  displayName: "code___StyledParagraph",
  componentId: "sc-7evkve-8"
})(["flex:1"]);
var _StyledP6 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP6",
  componentId: "sc-7evkve-9"
})(["", ""], function (p) {
  return p.$_css;
});
var _StyledP7 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP7",
  componentId: "sc-7evkve-10"
})(["background:", ";"], function (p) {
  return p.$_css2;
});
var _StyledP8 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP8",
  componentId: "sc-7evkve-11"
})(["color:", ";"], function (props) {
  return props.theme.a;
});
var _StyledP9 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP9",
  componentId: "sc-7evkve-12"
})(["border-radius:", "px;"], radius);
var _StyledP0 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP0",
  componentId: "sc-7evkve-13"
})(["color:", ";"], function (p) {
  return p.$_css3;
});
var _StyledP1 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP1",
  componentId: "sc-7evkve-14"
})(["color:", ";"], function (props) {
  return props.theme.color;
});
var _StyledButtonGhost = (0, _styledComponents["default"])(Button.Ghost).withConfig({
  displayName: "code___StyledButtonGhost",
  componentId: "sc-7evkve-15"
})(["flex:1"]);
var _StyledButtonGhostNew = (0, _styledComponents["default"])(Button.Ghost.New).withConfig({
  displayName: "code___StyledButtonGhostNew",
  componentId: "sc-7evkve-16"
})(["flex:1"]);
var _StyledButtonGhost2 = (0, _styledComponents["default"])(button.ghost).withConfig({
  displayName: "code___StyledButtonGhost2",
  componentId: "sc-7evkve-17"
})(["flex:1"]);
var _StyledButtonGhost3 = (0, _styledComponents["default"])("button-ghost").withConfig({
  displayName: "code___StyledButtonGhost3",
  componentId: "sc-7evkve-18"
})(["flex:1"]);
var _StyledP10 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP10",
  componentId: "sc-7evkve-19"
})(function (p) {
  return {
    background: p.$_css4,
    color: p.$_css5,
    textAlign: 'left',
    '::before': {
      content: p.$_css6
    },
    '::after': {
      content: p.$_css7
    }
  };
});
var _StyledP11 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP11",
  componentId: "sc-7evkve-20"
})(function (p) {
  return _objectSpread(_objectSpread({}, _objectSpread({
    '::before': {
      content: p.$_css8
    },
    '::after': {
      content: p.$_css9
    }
  }, {
    '::before': {
      content: p.$_css0
    },
    '::after': {
      content: p.$_css1
    }
  })), {}, {
    background: p.$_css10,
    textAlign: 'left',
    '::before': {
      content: p.$_css11
    },
    '::after': {
      content: p.$_css12
    }
  });
});
var _StyledSomeComponent = (0, _styledComponents["default"])(_SomeComponentPath["default"]).withConfig({
  displayName: "code___StyledSomeComponent",
  componentId: "sc-7evkve-23"
})(["color:red;"]);
var _StyledP12 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP12",
  componentId: "sc-7evkve-25"
})(function (p) {
  return {
    color: p.$_css13
  };
});
var _StyledDiv = (0, _styledComponents["default"])("div").withConfig({
  displayName: "code___StyledDiv",
  componentId: "sc-7evkve-30"
})(function (p) {
  return _objectSpread(_objectSpread({}, p.$_css18), p.$_css19);
});

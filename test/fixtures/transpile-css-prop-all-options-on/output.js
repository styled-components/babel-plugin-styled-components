"use strict";

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _SomeComponentPath = _interopRequireDefault(require("../SomeComponentPath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../SomeOtherComponentPath'),
    SomeOtherComponent = _require.SomeOtherComponent;
/**
 * control
 */


var _StyledSomeOtherComponent = (0, _styledComponents["default"])(SomeOtherComponent).withConfig({
  displayName: "code___StyledSomeOtherComponent",
  componentId: "sc-7evkve-0"
})(["color:red;"]);

var Thing = _styledComponents["default"].div.withConfig({
  displayName: "code__Thing",
  componentId: "sc-7evkve-1"
})(["color:red;"]);

var Thing2 = (0, _styledComponents["default"])(Thing).withConfig({
  displayName: "code__Thing2",
  componentId: "sc-7evkve-2"
})(["background:blue;"]);
/*
 * Basic fixtures
 */

var _StyledP = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP",
  componentId: "sc-7evkve-3"
})(["flex:1;"]);

var StaticString = function StaticString(p) {
  return <_StyledP>A</_StyledP>;
};

var _StyledP2 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP2",
  componentId: "sc-7evkve-4"
})(["flex:1;"]);

var StaticTemplate = function StaticTemplate(p) {
  return <_StyledP2>
    A
  </_StyledP2>;
};

var _StyledP3 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP3",
  componentId: "sc-7evkve-5"
})({
  color: 'blue'
});

var ObjectProp = function ObjectProp(p) {
  return <_StyledP3>A</_StyledP3>;
};

var _StyledP4 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP4",
  componentId: "sc-7evkve-6"
})(["flex:1;"]);

var NoChildren = function NoChildren(p) {
  return <_StyledP4 />;
};

var _StyledP5 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP5",
  componentId: "sc-7evkve-7"
})(["color:blue;"]);

var CssHelperProp = function CssHelperProp(p) {
  return <_StyledP5>
    A
  </_StyledP5>;
};
/*
 * Dynamic prop
 */


var _StyledParagraph = (0, _styledComponents["default"])(Paragraph).withConfig({
  displayName: "code___StyledParagraph",
  componentId: "sc-7evkve-8"
})(["flex:1"]);

var CustomComp = function CustomComp(p) {
  return <_StyledParagraph>H</_StyledParagraph>;
};

var _StyledP6 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP6",
  componentId: "sc-7evkve-9"
})(["", ""], function (p) {
  return p._css;
});

var DynamicProp = function DynamicProp(p) {
  return <_StyledP6 _css={props.cssText}>H</_StyledP6>;
};

var _StyledP7 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP7",
  componentId: "sc-7evkve-10"
})(["background:", ";"], function (p) {
  return p._css2;
});

var LocalInterpolation = function LocalInterpolation(p) {
  return <_StyledP7 _css2={props.bg}>
    H
  </_StyledP7>;
};

var _StyledP8 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP8",
  componentId: "sc-7evkve-11"
})(["color:", ";"], function (props) {
  return props.theme.a;
});

var FuncInterpolation = function FuncInterpolation(p) {
  return <_StyledP8>
    H
  </_StyledP8>;
};

var radius = 10;

var _StyledP9 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP9",
  componentId: "sc-7evkve-12"
})(["border-radius:", "px;"], radius);

var GlobalInterpolation = function GlobalInterpolation(p) {
  return <_StyledP9>
    H
  </_StyledP9>;
};

var _StyledP10 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP10",
  componentId: "sc-7evkve-13"
})(["color:", ";"], function (p) {
  return p._css3;
});

var LocalCssHelperProp = function LocalCssHelperProp(p) {
  return <_StyledP10 _css3={p.color}>
    A
  </_StyledP10>;
};

var _StyledP11 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP11",
  componentId: "sc-7evkve-14"
})(["color:", ";"], function (props) {
  return props.theme.color;
});

var DynamicCssHelperProp = function DynamicCssHelperProp(p) {
  return <_StyledP11>
    A
  </_StyledP11>;
};

var _StyledButtonGhost = (0, _styledComponents["default"])(Button.Ghost).withConfig({
  displayName: "code___StyledButtonGhost",
  componentId: "sc-7evkve-15"
})(["flex:1"]);

var CustomCompWithDot = function CustomCompWithDot(p) {
  return <_StyledButtonGhost>H</_StyledButtonGhost>;
};

var _StyledButtonGhostNew = (0, _styledComponents["default"])(Button.Ghost.New).withConfig({
  displayName: "code___StyledButtonGhostNew",
  componentId: "sc-7evkve-16"
})(["flex:1"]);

var NestedCompWithDot = function NestedCompWithDot(p) {
  return <_StyledButtonGhostNew>H</_StyledButtonGhostNew>;
};

var _StyledButtonGhost2 = (0, _styledComponents["default"])(button.ghost).withConfig({
  displayName: "code___StyledButtonGhost2",
  componentId: "sc-7evkve-17"
})(["flex:1"]);

var CustomCompWithDotLowerCase = function CustomCompWithDotLowerCase(p) {
  return <_StyledButtonGhost2>H</_StyledButtonGhost2>;
};

var _StyledButtonGhost3 = (0, _styledComponents["default"])("button-ghost").withConfig({
  displayName: "code___StyledButtonGhost3",
  componentId: "sc-7evkve-18"
})(["flex:1"]);

var CustomElement = function CustomElement(p) {
  return <_StyledButtonGhost3>H</_StyledButtonGhost3>;
};

var globalVar = '"foo"';

var getAfterValue = function getAfterValue() {
  return '"bar"';
};

var _StyledP12 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP12",
  componentId: "sc-7evkve-19"
})(function (p) {
  return {
    background: p._css4,
    color: p._css5,
    textAlign: 'left',
    '::before': {
      content: p._css6
    },
    '::after': {
      content: p._css7
    }
  };
});

var ObjectPropMixedInputs = function ObjectPropMixedInputs(p) {
  var color = 'red';
  return <_StyledP12 _css4={p.background} _css5={color} _css6={globalVar} _css7={getAfterValue()}>
      A
    </_StyledP12>;
};

var _StyledP13 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP13",
  componentId: "sc-7evkve-20"
})(function (p) {
  return _objectSpread(_objectSpread({}, _objectSpread({
    '::before': {
      content: p._css8
    },
    '::after': {
      content: p._css9
    }
  }, {
    '::before': {
      content: p._css10
    },
    '::after': {
      content: p._css11
    }
  })), {}, {
    background: p._css12,
    textAlign: 'left',
    '::before': {
      content: p._css13
    },
    '::after': {
      content: p._css14
    }
  });
});

var SpreadObjectPropMixedInputs = function SpreadObjectPropMixedInputs(p) {
  var color = 'red';
  return <_StyledP13 _css8={globalVar} _css9={getAfterValue()} _css10={globalVar} _css11={getAfterValue()} _css12={p.background} _css13={globalVar} _css14={getAfterValue()}>
      A
    </_StyledP13>;
};

var _StyledP14 = (0, _styledComponents["default"])("p").withConfig({
  displayName: "code___StyledP14",
  componentId: "sc-7evkve-21"
})(function (p) {
  return _objectSpread(_objectSpread({}, cssObj), {}, {
    textAlign: 'left',
    '::before': {
      content: p._css15
    },
    '::after': {
      content: p._css16
    }
  });
});

var SpreadObjectInputs = function SpreadObjectInputs(p) {
  var cssObj = {
    background: 'red'
  };
  return <_StyledP14 _css15={globalVar} _css16={getAfterValue()}>
      A
    </_StyledP14>;
};
/* styled component defined after function it's used in */


var EarlyUsageComponent = function EarlyUsageComponent(p) {
  return <_StyledThing />;
};

var Thing3 = _styledComponents["default"].div.withConfig({
  displayName: "code__Thing3",
  componentId: "sc-7evkve-22"
})(["color:blue;"]);

var _StyledThing = (0, _styledComponents["default"])(Thing3).withConfig({
  displayName: "code___StyledThing",
  componentId: "sc-7evkve-23"
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
  componentId: "sc-7evkve-24"
})(["color:red;"]);

var _StyledSomeComponent = (0, _styledComponents["default"])(_SomeComponentPath["default"]).withConfig({
  displayName: "code___StyledSomeComponent",
  componentId: "sc-7evkve-25"
})(["color:red;"]);

var ImportedComponentUsage = function ImportedComponentUsage(p) {
  return <_StyledSomeComponent />;
};

var RequiredComponentUsage = function RequiredComponentUsage(p) {
  return <_StyledSomeOtherComponent />;
};

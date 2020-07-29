"use strict";

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject17() {
  var data = _taggedTemplateLiteral(["color: red;"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["\n  color: blue;\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["flex: 1"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["flex: 1"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["flex: 1"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["flex: 1"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n    "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n    "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n      border-radius: ", "px;\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n      background: ", ";\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["flex: 1"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      color: blue;\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["flex: 1;"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      flex: 1;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["flex: 1;"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _StyledP = (0, _styledComponents["default"])("p")(_templateObject());

/*
 * Basic fixtures
 */
var StaticString = function StaticString(p) {
  return <_StyledP>A</_StyledP>;
};

var _StyledP2 = (0, _styledComponents["default"])("p")(_templateObject2());

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

var _StyledP4 = (0, _styledComponents["default"])("p")(_templateObject3());

var NoChildren = function NoChildren(p) {
  return <_StyledP4 />;
};

var _StyledP5 = (0, _styledComponents["default"])("p")(_templateObject4());

var CssHelperProp = function CssHelperProp(p) {
  return <_StyledP5>
    A
  </_StyledP5>;
};
/*
 * Dynamic prop
 */


var _StyledParagraph = (0, _styledComponents["default"])(Paragraph)(_templateObject5());

var CustomComp = function CustomComp(p) {
  return <_StyledParagraph>H</_StyledParagraph>;
};

var _StyledP6 = (0, _styledComponents["default"])("p")(_templateObject6(), function (p) {
  return p._css;
});

var DynamicProp = function DynamicProp(p) {
  return <_StyledP6 _css={props.cssText}>H</_StyledP6>;
};

var _StyledP7 = (0, _styledComponents["default"])("p")(_templateObject7(), function (p) {
  return p._css2;
});

var LocalInterpolation = function LocalInterpolation(p) {
  return <_StyledP7 _css2={props.bg}>
    H
  </_StyledP7>;
};

var _StyledP8 = (0, _styledComponents["default"])("p")(_templateObject8(), function (props) {
  return props.theme.a;
});

var FuncInterpolation = function FuncInterpolation(p) {
  return <_StyledP8>
    H
  </_StyledP8>;
};

var radius = 10;

var _StyledP9 = (0, _styledComponents["default"])("p")(_templateObject9(), radius);

var GlobalInterpolation = function GlobalInterpolation(p) {
  return <_StyledP9>
    H
  </_StyledP9>;
};

var _StyledP10 = (0, _styledComponents["default"])("p")(_templateObject10(), function (p) {
  return p._css3;
});

var LocalCssHelperProp = function LocalCssHelperProp(p) {
  return <_StyledP10 _css3={p.color}>
    A
  </_StyledP10>;
};

var _StyledP11 = (0, _styledComponents["default"])("p")(_templateObject11(), function (props) {
  return props.theme.color;
});

var DynamicCssHelperProp = function DynamicCssHelperProp(p) {
  return <_StyledP11>
    A
  </_StyledP11>;
};

var _StyledButtonGhost = (0, _styledComponents["default"])(Button.Ghost)(_templateObject12());

var CustomCompWithDot = function CustomCompWithDot(p) {
  return <_StyledButtonGhost>H</_StyledButtonGhost>;
};

var _StyledButtonGhostNew = (0, _styledComponents["default"])(Button.Ghost.New)(_templateObject13());

var NestedCompWithDot = function NestedCompWithDot(p) {
  return <_StyledButtonGhostNew>H</_StyledButtonGhostNew>;
};

var _StyledButtonGhost2 = (0, _styledComponents["default"])(button.ghost)(_templateObject14());

var CustomCompWithDotLowerCase = function CustomCompWithDotLowerCase(p) {
  return <_StyledButtonGhost2>H</_StyledButtonGhost2>;
};

var _StyledButtonGhost3 = (0, _styledComponents["default"])("button-ghost")(_templateObject15());

var CustomElement = function CustomElement(p) {
  return <_StyledButtonGhost3>H</_StyledButtonGhost3>;
};
/* styled component defined after function it's used in */


var EarlyUsageComponent = function EarlyUsageComponent(p) {
  return <_StyledThing />;
};

var Thing3 = styled.div(_templateObject16());

var _StyledThing = (0, _styledComponents["default"])(Thing3)(_templateObject17());

"use strict";

var _styledComponents = require("styled-components");

var FLEX = 'flex';
var flex = "\n  display: flex;\n";
var flexCSS = "display:flex;";
var flexCSSWithInterpolation = (0, _styledComponents.css)(["display:", ";"], function (props) {
  return 'flex';
});
var flexCSSWithConstantInterpolation = (0, _styledComponents.css)(["display:", ";"], FLEX);
var flexCSSFunction = (0, _styledComponents.css)("display: flex");

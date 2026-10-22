import _styled from "styled-components";
import React from 'react';
const gap = 4;
const Static = () => <_StyledP />;
const Dynamic = p => <_StyledDiv $_css={p.m} />;
const Obj = p => <_StyledSpan $_css2={p.color} />;
var _StyledP = _styled("p").withConfig({
  displayName: "code___StyledP",
  componentId: "sc-fcxzrw-0"
})(["color:red;"]);
var _StyledDiv = _styled("div").withConfig({
  displayName: "code___StyledDiv",
  componentId: "sc-fcxzrw-1"
})(["margin:", "px;padding:", "px;"], p => p.$_css, gap);
var _StyledSpan = _styled("span").withConfig({
  displayName: "code___StyledSpan",
  componentId: "sc-fcxzrw-2"
})(p => ({
  color: p.$_css2,
  padding: 1
}));

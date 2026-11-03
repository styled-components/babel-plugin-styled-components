import styled from 'styled-components';
const Element = () => <_StyledButtonGhost>H</_StyledButtonGhost>;
const MultiHyphen = () => <_StyledMyFooBar>H</_StyledMyFooBar>;
const DigitSegment = () => <_StyledFoo>H</_StyledFoo>;
var _StyledButtonGhost = styled("button-ghost")`flex: 1`;
var _StyledMyFooBar = styled("my-foo-bar")`flex: 2`;
var _StyledFoo = styled("foo-1")`flex: 3`;

import styled from 'styled-components';
import Icons from './icons';
const Element = () => <_StyledButtonGhost>H</_StyledButtonGhost>;
const MultiHyphen = () => <_StyledMyFooBar>H</_StyledMyFooBar>;
const DigitSegment = () => <_StyledFoo>H</_StyledFoo>;
const Svg = () => <svg>
    <_StyledClipPath />
  </svg>;
const Underscore = () => <_StyledFoo_bar>H</_StyledFoo_bar>;
const HyphenatedMember = () => <_StyledIconsArrowUp />;
var _StyledButtonGhost = styled("button-ghost")`flex: 1`;
var _StyledMyFooBar = styled("my-foo-bar")`flex: 2`;
var _StyledFoo = styled("foo-1")`flex: 3`;
var _StyledClipPath = styled("clipPath")`flex: 4`;
var _StyledFoo_bar = styled("foo_bar")`flex: 5`;
var _StyledIconsArrowUp = styled(Icons["arrow-up"])`flex: 6`;

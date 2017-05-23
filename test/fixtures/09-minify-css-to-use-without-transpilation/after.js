import styled from 'styled-components';

const Simple = styled.div`width: 100%;`;

const Interpolation = styled.div`content: "  ${props => props.text}  ";`;

const SpecialCharacters = styled.div`content: "  ${props => props.text}  ";color: red;`;

const Comment = styled.div`width: 100%;color: red;`;

const MultiComment = styled.div`width: 100%;
color: red;`;

const Parens = styled.div`&:hover {color: blue;}color: red;`;

const HelloWorld = styled.div`border-bottom: 2px solid blue;
border-top: 2px solid yellow;
border-bottom: 2px solid green;`;

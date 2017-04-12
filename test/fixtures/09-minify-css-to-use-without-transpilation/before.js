import styled from 'styled-components';

const Simple = styled.div`
  width: 100%;
`;

const Interpolation = styled.div`
  content: "  ${props => props.text}  ";
`;

const SpecialCharacters = styled.div`
  content: "  ${props => props.text}  ";\n color: red;
`;

const Comment = styled.div`
  width: 100%;
  // comment
  color: red;
`;

const MultiComment = styled.div`
  width: 100%; /*

    long multi-line comment

  */ color: red;
`;

const Parens = styled.div`
  &:hover {
    color: blue;
  }
  color: red;
`;

const HelloWorld = styled.div`
  border-bottom: 2px solid blue;
  /* this comment will be distributed */
  border-top: 2px solid yellow;
  /* with all the spaces as well                                                            */
  border-bottom: 2px solid green;
`;

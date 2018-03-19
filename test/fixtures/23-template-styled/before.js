const Simple = styled.div`width: 100%;`;

const Nested = styled.div`
  width: 100%;

  &:hover {
    color: papayawhip;
  }

  > div {
    background: white;
  }
`;

const Interpolations = styled.div`
  width: ${props => props.width};
`;

const NestedAndInterpolations = styled.div`
  width: ${props => props.width};

  &:hover {
    color: ${props => props.color};
  }
`;

const SelectorInterpolation = styled.div`
  width: ${props => props.width};

  ${props => props.selector} {
    color: papayawhip;
  }
`;

const CssHelper = css`width: 100%`;

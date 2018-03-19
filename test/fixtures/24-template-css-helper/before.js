const Simple = css`width: 100%;`;

const Nested = css`
  width: 100%;

  &:hover {
    color: papayawhip;
  }

  > div {
    background: white;
  }
`;

const Interpolations = css`
  width: ${props => props.width};
`;

const NestedAndInterpolations = css`
  width: ${props => props.width};

  &:hover {
    color: ${props => props.color};
  }
`;

const SelectorInterpolation = css`
  width: ${props => props.width};

  ${props => props.selector} {
    color: papayawhip;
  }
`;

const Styled = styled.div`width: 100%`;

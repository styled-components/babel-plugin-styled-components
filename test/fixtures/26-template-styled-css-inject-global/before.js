injectGlobal`
  ${glob}

  // comment
  /* comment */
  /*! preserve comment */

  html, body {
    margin: 100000px;
    padding: ${test};

    @media (max-width: 999px) {
      margin: 0;
    }
  }

  .root {
    width: 100%;
  }
`;

const Simple = css`width: 100%;`;

const Styled = styled.div`width: 100%`;

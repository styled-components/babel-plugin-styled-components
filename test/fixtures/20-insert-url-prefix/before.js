import styled from 'styled-components';

const WithURL = styled.div`
  background: url('/images/bar.png') no-repeat center center;
`;

const WithURLNested = styled(WithURL)`
  background: url('/images/baz.png') no-repeat center center;
`;
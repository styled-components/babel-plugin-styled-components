import styled from 'styled-components';

const WithURL = styled.div.withConfig({
  displayName: 'before__WithURL'
})(['background:url(\'https://foo.com/images/bar.png\') no-repeat center center;']);

const WithURLNested = styled(WithURL).withConfig({
  displayName: 'before__WithURLNested'
})(['background:url(\'https://foo.com/images/baz.png\') no-repeat center center;']);
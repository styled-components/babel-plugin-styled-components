import styled from 'styled-components';
const baseConfig = {
  shouldForwardProp: () => true
};
// Pre-transpiled call form with a spread inside withConfig and no displayName yet
const X = styled.div.withConfig({
  ...baseConfig,
  displayName: "code__X",
  componentId: "sc-14mm7u0-0"
})(['template']);

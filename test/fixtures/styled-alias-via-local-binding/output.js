// Regression: TypeScript theme-typing patterns re-bind the default import
// through a local `const`, e.g. `const styled = baseStyled as ThemedSC<...>`.
// After type-stripping, Babel sees a plain `const styled = baseStyled`.
// The detector must follow such single-identifier aliases so `styled.div` is
// still recognized as a styled-component declaration.
import baseStyled from 'styled-components';
const styled = baseStyled;
const Foo = styled.div.withConfig({
  displayName: "Foo",
  componentId: "sc-ep8j7b-0"
})`color:red;`;
const Bar = styled('span').withConfig({
  displayName: "Bar",
  componentId: "sc-ep8j7b-1"
})`color:blue;`;

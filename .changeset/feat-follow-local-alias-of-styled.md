---
'babel-plugin-styled-components': minor
---

Detect styled declarations that go through a local alias of the import, including the TypeScript theme-typing pattern `const styled = baseStyled as ThemedStyledInterface<MyTheme>`. After type-stripping Babel sees a plain `const styled = baseStyled`, and the detector now follows single-identifier alias chains so `styled.div` resolves back to the original import.

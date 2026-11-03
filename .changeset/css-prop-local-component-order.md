---
'babel-plugin-styled-components': patch
---

Fix a `ReferenceError: Cannot access 'x' before initialization` when the `css` prop is used on a component declared in the same file (such as `const { Paragraph } = Typography`) and the css reads a `const` declared further down; the generated component now follows every value its css reads.

---
'babel-plugin-styled-components': patch
---

The `css` prop now works on every element name JSX treats as a tag, such as `<my-foo-bar>`, `<foo-1>`, `<clipPath>`, and `<foo_bar>`, and on hyphenated members like `<Icons.arrow-up>`. These used to compile to code that referenced a variable that doesn't exist, like `styled(clipPath)`, and threw when it ran.

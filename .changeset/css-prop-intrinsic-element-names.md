---
'babel-plugin-styled-components': patch
---

The `css` prop now works on custom elements like `<my-foo-bar>` and `<foo-1>`, on lowercase names with no variable of that name in scope like `<clipPath>` and `<foo_bar>`, and on hyphenated members like `<Icons.arrow-up>`. These used to compile to code that referenced a variable that doesn't exist, like `styled(clipPath)`, and threw when it ran. A lowercase name that does match a variable, like `<myButton css>` after `const myButton = styled.button`, still styles that variable.

---
'babel-plugin-styled-components': patch
---

Fix line comments surviving minification when they follow the closing line of a multiline value (e.g. `minmax(\n  0,\n  1fr\n); // comment`). The comment check required balanced parentheses on the line, so the unmatched `)` made the comment look like it was inside a value; after lines were joined, styled-components treated everything after `//` as a comment and silently dropped the following declarations and nested blocks. Unmatched closing parentheses are now ignored, which also stops `url(//...)` values after them from being truncated.

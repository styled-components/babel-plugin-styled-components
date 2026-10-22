---
'babel-plugin-styled-components': patch
---

Fix minification dropping rules after a commented line whose string contains an apostrophe, escaped quote, or parenthesis (e.g. `content: "it's"; // note`).

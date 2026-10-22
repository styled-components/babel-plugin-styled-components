---
'babel-plugin-styled-components': patch
---

Helpers imported before `styled` in a named import are recognized now. In `import { css, styled } from 'styled-components'`, `css` and `keyframes` are minified, and with pure annotations turned on they are marked pure.

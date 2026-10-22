---
'babel-plugin-styled-components': patch
---

Fix `styled.default.x` losing displayName and componentId with `import * as styled` alongside the css prop or a default import.

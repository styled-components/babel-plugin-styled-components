---
'babel-plugin-styled-components': patch
---

CommonJS files that call helpers like `isStyledComponent` on the required module crashed at runtime after the last release. `const sc = require('styled-components')` followed by `sc.isStyledComponent(A)` was rewritten into `sc.isStyledComponent.withConfig(...)(A)`, which throws `TypeError: sc.isStyledComponent.withConfig is not a function` on styled-components v5, v6, and v7. Those helper calls are left alone now, and real tags such as `sc.div` and `sc.default.div` still receive a display name and component id.

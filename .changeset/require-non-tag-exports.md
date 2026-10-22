---
'babel-plugin-styled-components': patch
---

CommonJS files that call helpers like `isStyledComponent` on the required module crashed at runtime after the last release. `const sc = require('styled-components')` followed by `sc.isStyledComponent(A)` was rewritten into `sc.isStyledComponent.withConfig(...)(A)`, which throws `TypeError: sc.isStyledComponent.withConfig is not a function` on styled-components v5, v6, and v7. The same rewrite hit `sc.default.isStyledComponent(A)`, a namespace import (`ns.default.isStyledComponent(A)`), and computed access (`sc['isStyledComponent'](A)`, `sc.default['createTheme']({})`). Helper exports did it too, including `sc.default.css` and `sc['css']`. Those calls are left alone now. Real tags written the same way, including `sc.div`, `sc.default.div`, `ns.default.div`, `sc['div']`, and `sc.default['div']`, still receive a display name and component id.

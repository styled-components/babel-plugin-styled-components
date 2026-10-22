---
'babel-plugin-styled-components': patch
---

CommonJS and aliased styled-components bindings no longer treat every property as a component. `const sc = require('styled-components')` followed by `sc.isStyledComponent(A)`, `sc.hasOwnProperty('css')`, `sc.toString()`, or a property this plugin does not know (`sc.somethingNew`) was rewritten into a `.withConfig(...)` call and crashed on styled-components v5, v6, and v7. The same crash happened through `sc.default`, `sc['default']`, a namespace import, an aliased import (`import sc` or `import { styled as s }`), and a local `sc` that shadowed or replaced the require. Those are left alone now.

Tags and real `styled()` calls still get a display name and component id, including `sc.div`, `sc['div']`, `sc.default.div`, `sc['default'].div`, `sc(Comp)`, `sc.default(Comp)`, and `sc['default'](Comp)`. A default or named import whose local name is `styled` still decorates unknown properties, so a future tag on the v7 proxy keeps working. A computed key that is a variable (`sc.default[name]`) is decorated the way it was before, instead of being mistaken for a helper.

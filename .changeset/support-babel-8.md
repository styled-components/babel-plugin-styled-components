---
'babel-plugin-styled-components': minor
---

Support Babel 8. The plugin now installs alongside `@babel/core@8` without peer dependency warnings or errors, and the `css` prop transform no longer crashes with `t.jSXIdentifier is not a function` on Babel 8. The plugin also no longer depends on `@babel/plugin-syntax-jsx`, which only accepted Babel 7 as a peer.

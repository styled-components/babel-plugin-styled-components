---
'babel-plugin-styled-components': patch
---

Fix invalid output when a `css={{ ... }}` object key matches a local binding name (e.g. `({ position }) => <div css={{ position: 'absolute' }} />`). The reducer no longer mis-treats non-computed property names as scope references, so plain keys stay literal while only computed `[expr]` keys are extracted as prop interpolations.

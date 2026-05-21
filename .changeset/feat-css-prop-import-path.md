---
'babel-plugin-styled-components': minor
---

Add a `cssPropImportPath` option to control which package the css-prop transform auto-imports `styled` from when the file has no existing styled import. Defaults to `'styled-components'` (existing behavior). React Native targets can set it to `'styled-components/native'` so the auto-injected import resolves to the right runtime.

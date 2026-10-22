---
'babel-plugin-styled-components': patch
---

Faster transforms: the plugin's own time drops about 2–4× on typical files and up to ~28× on CommonJS files with many `css` props.

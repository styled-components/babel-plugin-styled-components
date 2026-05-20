---
"babel-plugin-styled-components": minor
---

Refresh the toolchain and fix a handful of css-prop transform bugs that had crept in under recent Babel versions.

- When a file already imports `styled` and also uses one or more `css={…}` props, every styled component now keeps its display name and stable component id. Previously the cache that tracks the local default import could be overwritten on each css-prop usage, which silently dropped the display name and id for the surrounding `styled.div` declarations.
- `css={{ [foo]: bar }}` with a non-primitive value no longer fails Babel's validator. Computed keys are preserved through the css-prop object rewrite.
- Friendlier error messages when the css-prop transform encounters a JSX name shape it can't infer, instead of a confusing internal `ReferenceError`.
- Long-running watch processes (Next dev, webpack-dev-server, jest watch) no longer leak import-detection state between files.
- Removed the runtime `lodash` dependency. The plugin now ships with `@babel/core` as a declared peer.
- Dev tooling moved to pnpm and changesets. Plugin behavior is unchanged.

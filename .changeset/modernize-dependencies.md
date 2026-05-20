---
"babel-plugin-styled-components": minor
---

Refresh the dev toolchain and fix a handful of css-prop transform bugs.

- Files mixing regular styled components with `css={...}` props keep their display names and component ids again.
- `css={{ [foo]: bar }}` with a non-primitive value no longer crashes the build.
- `withConfig({ ...spread })` and `withConfig({ 'displayName': '...' })` no longer crash or silently override your explicit values.
- Errors from the css-prop transform now point at the offending source line.
- Long-running dev servers no longer leak detection state between files.
- Drops the `lodash` runtime dependency. `@babel/core` is now a declared peer.
- Dev tooling moved to pnpm and changesets.

---
"babel-plugin-styled-components": minor
---

Modernize the toolchain and fix several css-prop transform bugs.

- Switch the dev tooling from yarn 3 to pnpm 11; add `@changesets/cli` infrastructure and a release workflow
- Bump Babel deps to ^7.26 and replace deprecated `@babel/plugin-proposal-class-properties` with `@babel/plugin-transform-class-properties`
- Drop the `lodash` runtime dependency (inlined a small `difference()` helper, the only lodash use)
- Bump `picomatch` to ^4 (API-compatible at our call site)
- Declare `@babel/core` as a peerDependency (fixes peer-dep warnings under strict resolvers)
- Fix a longstanding bug where the css-prop transform's guard around `addDefault('styled-components')` always fired. Under newer `@babel/helper-module-imports` this caused the cached default-import name to be overwritten with a fresh alias like `_styled26`, so `isStyled()` stopped matching user-written `styled.div` and dropped `displayName`/`componentId` entirely on files with both pre-existing `import styled from 'styled-components'` and one or more `css={…}` usages
- Eagerly run the styled-component visitors on the variable the css-prop transform injects, since Babel does not reliably re-visit nodes pushed onto `Program` from inside a `Program`-enter sub-traversal
- Preserve `computed` and `shorthand` flags on rewritten ObjectProperty in the css-prop object reducer, so `css={{ [computedKey]: nonPrimitiveValue }}` no longer fails Babel's validator
- Fix a latent `ReferenceError` in the local `getName`/`getNameExpression` helpers — the throw path referenced an out-of-scope `path` and would throw the wrong error
- Move `importLocalName`'s cache from a process-wide module-level map (cross-file bleed in long-running watchers) to per-file `state.file.set/get`
- Hoist factory currying and `importLocalName('default', state)` so per-node visits skip redundant closure allocation
- Drop the dead `isInjectGlobalHelper` detector (styled-components v2 API removed years ago)

Verified against `styled-components@^6.1` and `styled-components@7.0.0-prerelease-*`.

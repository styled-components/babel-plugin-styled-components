# babel-plugin-styled-components

## 2.3.0

### Minor Changes

- 0c5f21d: Add a `cssPropImportPath` option to control which package the css-prop transform auto-imports `styled` from when the file has no existing styled import. Defaults to `'styled-components'` (existing behavior). React Native targets can set it to `'styled-components/native'` so the auto-injected import resolves to the right runtime.
- 0c5f21d: Detect styled declarations that go through a local alias of the import, including the TypeScript theme-typing pattern `const styled = baseStyled as ThemedStyledInterface<MyTheme>`. After type-stripping Babel sees a plain `const styled = baseStyled`, and the detector now follows single-identifier alias chains so `styled.div` resolves back to the original import.

### Patch Changes

- 0c5f21d: Fix invalid output when a `css={{ ... }}` object key matches a local binding name (e.g. `({ position }) => <div css={{ position: 'absolute' }} />`). The reducer no longer mis-treats non-computed property names as scope references, so plain keys stay literal while only computed `[expr]` keys are extracted as prop interpolations.
- 0c5f21d: Recognize TypeScript's `__importDefault` interop helper alongside Babel's `_interopRequireDefault`. Files compiled through `tsc` / `ts-jest` (which emit `var sc_1 = __importDefault(require('styled-components'))`) now flow into the same detection path as Babel-compiled output, so styled declarations downstream pick up `displayName` and `componentId` as expected.

## 2.2.0

### Minor Changes

- a40e3f7: Refresh the toolchain and fix a handful of css-prop transform bugs that had crept in under recent Babel versions.
  - When a file already imports `styled` and also uses one or more `css={…}` props, every styled component now keeps its display name and stable component id. Previously the cache that tracks the local default import could be overwritten on each css-prop usage, which silently dropped the display name and id for the surrounding `styled.div` declarations.
  - `css={{ [foo]: bar }}` with a non-primitive value no longer fails Babel's validator. Computed keys are preserved through the css-prop object rewrite.
  - Friendlier error messages when the css-prop transform encounters a JSX name shape it can't infer, instead of a confusing internal `ReferenceError`.
  - Long-running watch processes (Next dev, webpack-dev-server, jest watch) no longer leak import-detection state between files.
  - Removed the runtime `lodash` dependency. The plugin now ships with `@babel/core` as a declared peer.
  - Dev tooling moved to pnpm and changesets. Plugin behavior is unchanged.

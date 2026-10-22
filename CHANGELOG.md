# babel-plugin-styled-components

## 2.3.1

### Patch Changes

- 860a70c: Add npm bugs metadata pointing to the GitHub issue tracker.
- 64b6319: Fix a crash when the `css` prop is used in a CommonJS file without a `styled-components` import.
- 257f0e9: Faster transforms: the plugin's own time drops about 2–4× on typical files and up to ~28× on CommonJS files with many `css` props.
- f4b2476: Fix line comments surviving minification when they follow the closing line of a multiline value (e.g. `minmax(\n  0,\n  1fr\n); // comment`). The comment check required balanced parentheses on the line, so the unmatched `)` made the comment look like it was inside a value; after lines were joined, styled-components treated everything after `//` as a comment and silently dropped the following declarations and nested blocks. Unmatched closing parentheses are now ignored, which also stops `url(//...)` values after them from being truncated.
- c7f23cf: Fix components losing displayName and componentId when a `declare module` block also imports `styled-components`.
- cbd8d02: Ignore `import type` from `styled-components` when finding the real `styled` import.
- b3c8e76: Fix `styled.default.x` losing displayName and componentId with `import * as styled` alongside the css prop or a default import.
- 9baee30: Helpers imported before `styled` in a named import are recognized now. In `import { css, styled } from 'styled-components'`, `css` and `keyframes` are minified, and with pure annotations turned on they are marked pure.
- 523e10b: Fix broken output for `styled.default(Component)` with `import * as styled` or `require`.
- fbdd435: Recognize `styled` under any local name, such as `import { styled as sc }` or `const sc = require('styled-components')`.
- 9baee30: A binding that is the styled factory keeps display names and component ids for properties this plugin does not recognize. On styled-components v7 that factory is a proxy, so `styled.box`, `styled.foo`, and `styled.feNotAFilter` are real components. `const styled = require('styled-components')`, `import sc from 'styled-components'`, `sc.default`, `ns.default`, and `__importDefault(require('styled-components')).default` are that factory. Known non-tag exports stay plain, including `sc.css`, `sc.keyframes`, `sc.createGlobalStyle`, `sc['createGlobalStyle']`, `sc.isStyledComponent`, and `sc.default.css`. Names on `Object.prototype` or `Function.prototype` stay plain too, including `sc.hasOwnProperty`, `sc.toString`, `sc.bind`, `sc.__lookupGetter__`, `sc.name`, and `sc.__proto__`. A computed key is resolved when it is a string, a template whose parts all fold to strings, or a const initialized to one of those, so `const name = 'css'; sc[name]`, ``sc[`css`]``, and ``sc[`${'css'}`]`` stay plain, while `const css = 'div'; sc[css]` and `sc.default[css]` keep their ids. A key this plugin cannot resolve stays plain on `require()` and on an alias that is not named `styled`, so `let dynamic = 'css'; sc[dynamic]` returns the helper instead of throwing. `styled[dynamic]` on an import named `styled` is still decorated. A `let` or `var` that starts as the factory keeps its display name on a straight-line use written before the reassignment. A use inside a nested function, or inside a loop that also reassigns the binding, is left alone, so that function and the next loop iteration do not throw.
- 6bcb0e3: Fix minification dropping rules after a commented line whose string contains an apostrophe, escaped quote, or parenthesis (e.g. `content: "it's"; // note`).

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

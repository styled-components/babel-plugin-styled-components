const sc = require('styled-components')

const name = 'css'
const alias = name
const tag = 'box'
const css = 'div'
let dynamic = 'css'

const Skipped = sc[name]`color: red;`
const SkippedAlias = sc[alias]`color: blue;`
const SkippedTpl = sc[`css`]`color: green;`
const SkippedDefault = sc.default[name]`color: orange;`
const ViaDiv = sc[css]`color: purple;`
const Tag = sc[tag]`color: pink;`
// A key that is not a const string stays decorated, even when its runtime
// value is a helper. `let` and `var` are not folded.
const Dynamic = sc[dynamic]`color: black;`

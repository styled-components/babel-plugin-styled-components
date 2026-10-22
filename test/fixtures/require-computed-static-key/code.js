const sc = require('styled-components')

const name = 'css'
const alias = name
const tag = 'box'
const css = 'div'
let dynamic = 'css'
const bag = { key: 'css' }
const { key: fromBag } = bag

const Skipped = sc[name]`color: red;`
const SkippedAlias = sc[alias]`color: blue;`
const SkippedTpl = sc[`css`]`color: green;`
const SkippedDefault = sc.default[name]`color: orange;`
const ViaDiv = sc[css]`color: purple;`
const Tag = sc[tag]`color: pink;`
// A key that does not fold to a string stays plain on a require binding.
const Dynamic = sc[dynamic]`color: black;`
const FromBag = sc[fromBag]`color: white;`
const FoldedHelper = sc[`${'css'}`]`color: teal;`
const FoldedTag = sc[`${'span'}`]`color: gray;`

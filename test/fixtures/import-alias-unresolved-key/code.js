import { styled as s } from 'styled-components'
import { ThemeProvider as themeKey } from 'styled-components'

let dynamic = 'div'

const Comp = s.box`color: red;`
const Skipped = s[dynamic]`color: blue;`
const SkippedImport = s[themeKey]`color: green;`

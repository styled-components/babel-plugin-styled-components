import sc from 'styled-components'
import { styled as s } from 'styled-components'

const FromDefault = sc.div`color: red;`
const FromNamed = s.View`color: blue;`
const helper = sc.isStyledComponent(FromDefault)
const unknown = s.somethingNew`color: green;`
const owned = sc.hasOwnProperty('div')
const Box = sc.box`color: white;`
const Filter = s.feNotAFilter`color: black;`
const helperCss = sc.css`color: pink;`
const helperDefault = sc.default.css`color: teal;`
const FromDefaultProxy = sc.default.marquee`color: gray;`

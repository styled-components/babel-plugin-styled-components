import { 'styled' as s } from 'styled-components'

const Tag = s.div`color: red;`
const helper = s.isStyledComponent(Tag)
const unknown = s.somethingNew`color: blue;`

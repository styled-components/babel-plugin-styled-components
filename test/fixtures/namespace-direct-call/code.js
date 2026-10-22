import * as ns from 'styled-components'

function Base(props) {
  return props.children || null
}

const Called = ns(Base)`color: red;`
const ViaComputed = ns['default'](Base)`color: blue;`
const Tag = ns.div`color: green;`
const helper = ns.isStyledComponent(Tag)
const renamed = ns.default
const Aliased = renamed.span`color: purple;`
const unknown = renamed.somethingNew`color: black;`

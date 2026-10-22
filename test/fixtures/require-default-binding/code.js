const styled = require('styled-components').default
const viaComputed = require('styled-components')['default']

function Base(props) {
  return props.children || null
}

const Tag = styled.div`color: red;`
const Called = viaComputed(Base)`color: blue;`
const helper = styled.isStyledComponent(Tag)
const unknown = styled.somethingNew`color: green;`

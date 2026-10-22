const sc = require('styled-components')
const styled = sc.default

const Tag = styled.div`color: red;`
const helper = styled.isStyledComponent(Tag)
const unknown = styled.somethingNew`color: blue;`

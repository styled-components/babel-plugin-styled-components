const styled = require('styled-components')

const x = () => null
const ok = styled.isStyledComponent(x)
const theme = styled.createTheme({})
const extracted = styled.extractCSS()
const Tag = styled.div`color: red;`

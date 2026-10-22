const styled = require('styled-components')

const x = () => null
const ok = styled.isStyledComponent(x)
const theme = styled.createTheme({})
const extracted = styled.extractCSS()
const Tag = styled.div`color: red;`
const Box = styled.box`color: blue;`
const Foo = styled.foo`color: green;`
const Filter = styled.feNotAFilter`color: orange;`
const Marquee = styled.marquee`color: purple;`
const helperCss = styled.css`color: pink;`
const helperKeyframes = styled.keyframes`from { opacity: 0; } to { opacity: 1; }`
const helperGlobal = styled.createGlobalStyle`body { margin: 0; }`
const helperComputed = styled['createGlobalStyle']`body { margin: 0; }`
const owned = styled.hasOwnProperty('div')
const text = String(styled.toString())
const helperDefaultCss = styled.default.css`color: black;`

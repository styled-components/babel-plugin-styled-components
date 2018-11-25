const Test = styled.div`
  width: 100%;
`
const Test2 = styled('div')`
  color: red;
`
const Test3 = true ? styled.div`` : styled.div``
const styles = {
  One: styled.div`
    color: yellow;
  `,
}
let Component
Component = styled.div``
const WrappedComponent = styled(Inner)``

const GlobalStyle = createGlobalStyle`
    body {
        color: red;
    }
`

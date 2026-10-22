import styled from 'styled-components'

declare module 'my-theme' {
  import typeof sc from 'styled-components'
  declare module.exports: sc
}

const Button = styled.div`
  color: red;
`

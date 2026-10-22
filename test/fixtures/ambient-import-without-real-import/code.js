import { observer } from 'mobx-react'

declare module 'my-theme' {
  import styled from 'styled-components'
  export const tag: typeof styled
}

const styled = { div: observer }

const Plain = styled.div`
  color: red;
`

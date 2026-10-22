import styled from 'styled-components'

const theme = { color: 'red' }

export { theme }

export const spacing = 4

export declare namespace Tokens {
  import sc from 'styled-components'
  export const tag: typeof sc
}

const Button = styled.div`
  color: red;
`

import styled from 'styled-components'

const Named = styled.div`
  width: 100%;
`

const NamedWithInterpolation = styled.div`
  color: ${props => props.color};
`

const Wrapped = styled(Inner)`
  color: red;
`

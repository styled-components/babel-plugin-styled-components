import styled from 'styled-components'

export const Component = styled.div`
  color: inherit;
`

const helper = size => `${size}rem`

const widthUnits = 'px'

const OtherComponent = styled(Component)`
  font-size: ${helper(2)};
  width: ${`50${widthUnits}`};
  height: ${p => helper(p.height)};
`

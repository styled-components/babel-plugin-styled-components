import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: blue;
`

export function MyComponent() {
  return React.createElement(Wrapper)
}
MyComponent.displayName = 'FancyName1'
MyComponent.defaultProps = {}

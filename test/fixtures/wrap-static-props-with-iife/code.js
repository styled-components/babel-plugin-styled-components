import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: blue;
`
Wrapper.defaultProps = {}

export function FunctionComponent() {
  return <Wrapper />
}
FunctionComponent.displayName = 'FancyName1'
FunctionComponent.defaultProps = {}

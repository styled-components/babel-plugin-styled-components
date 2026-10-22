import styled, { css, keyframes } from 'styled-components'
import typeof TypeofDefault from 'styled-components'
import type TypeOnlyDefault from 'styled-components'
import { type css as TypeOnlyCss, typeof keyframes as TypeofKeyframes } from 'styled-components'
import typeof * as TypeofNamespace from 'styled-components'

const Button = styled.div`
  color: red;
`

const mixin = css`
  color: blue;
`

const fade = keyframes`
  from { opacity: 0; }
`

const make = (TypeofNamespace: any) => TypeofNamespace.default.div`
  color: green;
`

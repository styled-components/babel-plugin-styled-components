import styled, { css, keyframes } from 'styled-components'
import type TypeOnlyDefault from 'styled-components'
import type { css as TypeOnlyCss } from 'styled-components'
import { type keyframes as TypeOnlyKeyframes } from 'styled-components'
import type * as TypeOnlyNamespace from 'styled-components'

const Button = styled.div`
  color: red;
`

const mixin = css`
  color: blue;
`

const fade = keyframes`
  from { opacity: 0; }
`

const make = (TypeOnlyNamespace: any) => TypeOnlyNamespace.default.div`
  color: green;
`

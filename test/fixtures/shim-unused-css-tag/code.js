import { css } from 'styled-components'

const FLEX = 'flex'

const flex = `
  display: flex;
`

const flexCSS = css`
  display: flex;
`

const flexCSSWithInterpolation = css`
  display: ${props => 'flex'};
`

const flexCSSWithConstantInterpolation = css`
  display: ${FLEX};
`

const flexCSSFunction = css(`display: flex`)

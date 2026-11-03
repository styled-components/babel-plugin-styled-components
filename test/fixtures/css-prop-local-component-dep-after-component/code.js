import { css } from 'styled-components'
import { Typography } from 'antd'

const { Paragraph } = Typography
const color = 'red'
const base = css`
  color: ${color};
`
const paragraphCss = css`
  ${base};
  font-size: 14px;
`

export const Text = ({ children }) => (
  <Paragraph css={paragraphCss}>{children}</Paragraph>
)

import { css } from 'styled-components'
import { Typography } from 'antd'

const Paragraph = Typography.Paragraph
const paragraphCss = css`
  font-size: 14px;
`

export const Text = ({ children }) => (
  <Paragraph css={paragraphCss}>{children}</Paragraph>
)

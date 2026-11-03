import { css } from 'styled-components'
import { Typography } from 'antd'

const { Paragraph } = Typography

export const Text = ({ children }) => (
  <Paragraph css={paragraphCss}>{children}</Paragraph>
)

const paragraphCss = css`
  font-size: 14px;
`

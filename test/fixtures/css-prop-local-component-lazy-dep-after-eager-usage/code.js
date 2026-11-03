import { css } from 'styled-components'
import { Typography } from 'antd'

const { Paragraph } = Typography

const size = css`
  font-size: 14px;
`

export const el = (
  <Paragraph css={css`${size} color: ${() => color};`}>Hi</Paragraph>
)

const color = 'red'

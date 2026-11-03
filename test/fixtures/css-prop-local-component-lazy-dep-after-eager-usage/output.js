import _styled, { css } from 'styled-components';
import { Typography } from 'antd';
const {
  Paragraph
} = Typography;
const size = css(["font-size:14px;"]);
var _StyledParagraph = _styled(Paragraph).withConfig({
  displayName: "code___StyledParagraph",
  componentId: "sc-4sa468-0"
})(["", " color:", ";"], size, () => color);
export const el = <_StyledParagraph>Hi</_StyledParagraph>;
const color = 'red';

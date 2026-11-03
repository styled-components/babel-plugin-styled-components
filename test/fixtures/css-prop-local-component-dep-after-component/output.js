import _styled, { css } from 'styled-components';
import { Typography } from 'antd';
const {
  Paragraph
} = Typography;
const color = 'red';
const base = css(["color:", ";"], color);
const paragraphCss = css(["", ";font-size:14px;"], base);
var _StyledParagraph = _styled(Paragraph).withConfig({
  displayName: "code___StyledParagraph",
  componentId: "sc-1vj5czu-0"
})(["", ""], paragraphCss);
export const Text = ({
  children
}) => <_StyledParagraph>{children}</_StyledParagraph>;

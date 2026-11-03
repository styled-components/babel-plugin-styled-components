import _styled, { css } from 'styled-components';
import { Typography } from 'antd';
const paragraphCss = css(["font-size:14px;"]);
const {
  Paragraph
} = Typography;
var _StyledParagraph = _styled(Paragraph).withConfig({
  displayName: "code___StyledParagraph",
  componentId: "sc-16e4q1q-0"
})(["", ""], paragraphCss);
export const Text = ({
  children
}) => <_StyledParagraph>{children}</_StyledParagraph>;

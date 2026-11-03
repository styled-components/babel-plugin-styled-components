import _styled, { css } from 'styled-components';
import { Typography } from 'antd';
const {
  Paragraph
} = Typography;
const paragraphCss = css(["font-size:14px;"]);
var _StyledParagraph = _styled(Paragraph).withConfig({
  displayName: "code___StyledParagraph",
  componentId: "sc-1fjk2wh-0"
})(["", ""], paragraphCss);
export const Text = ({
  children
}) => <_StyledParagraph>{children}</_StyledParagraph>;

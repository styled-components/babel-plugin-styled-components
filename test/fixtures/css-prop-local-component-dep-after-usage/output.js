import _styled, { css } from 'styled-components';
import { Typography } from 'antd';
const {
  Paragraph
} = Typography;
export const Text = ({
  children
}) => <_StyledParagraph>{children}</_StyledParagraph>;
const paragraphCss = css(["font-size:14px;"]);
var _StyledParagraph = _styled(Paragraph).withConfig({
  displayName: "code___StyledParagraph",
  componentId: "sc-8er70n-0"
})(["", ""], paragraphCss);

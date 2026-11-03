import _styled, { css } from 'styled-components';
import { Typography } from 'antd';
const {
  Paragraph
} = Typography;
var _StyledParagraph = _styled(Paragraph).withConfig({
  displayName: "code___StyledParagraph",
  componentId: "sc-ou3w6i-0"
})(["", ""], paragraphCss);
export const Text = ({
    children
  }) => <_StyledParagraph>{children}</_StyledParagraph>,
  paragraphCss = css(["font-size:14px;"]);

import _styled from "styled-components/native";
// React Native targets need the auto-injected default import to come from
// `styled-components/native` rather than the DOM package. The
// `cssPropImportPath` option lets the consumer name the package; the rest
// of the css-prop transform is shape-compatible with RN already (the
// PascalCase JSX name routes through the identifier branch and produces
// `styled(View)` instead of `styled('View')`).
import { View } from 'react-native';
const Comp = () => <_StyledView />;
export default Comp;
var _StyledView = _styled(View).withConfig({
  displayName: "_StyledView"
})({
  backgroundColor: 'red'
});

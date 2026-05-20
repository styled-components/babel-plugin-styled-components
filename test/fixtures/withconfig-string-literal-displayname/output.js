// Regression: hasDisplayNameOrComponentId must recognize displayName/componentId
// set via StringLiteral keys (both quoted `'displayName'` and computed
// `['displayName']`). Otherwise the visitor wraps with another withConfig and
// the auto-generated displayName silently overrides the user's value at
// runtime since later withConfig calls compose and the last value wins.
import styled from 'styled-components';
const QuotedDisplayName = styled.div.withConfig({
  'displayName': 'CustomA'
})`color:red;`;
const ComputedDisplayName = styled.div.withConfig({
  ['displayName']: 'CustomB'
})`color:blue;`;
const QuotedComponentId = styled.div.withConfig({
  'componentId': 'sc-custom-c'
})`color:green;`;
const CallFormQuotedDisplayName = styled.div.withConfig({
  'displayName': 'CustomD'
})({
  color: 'yellow'
});

// Locks in handling of the ESM namespace-default form
// (`styled.default.div`...``), which arises from
// `import * as styled from 'styled-components'` or from
// `@babel/plugin-transform-modules-commonjs` rewriting an `import styled` to
// `var styled = _interopRequireDefault(require('styled-components'))`.
import * as styled from 'styled-components';
const Tagged = styled.default.div.withConfig({
  displayName: "code__Tagged",
  componentId: "sc-gesvh4-0"
})(["color: red;"]);

---
'babel-plugin-styled-components': patch
---

Recognize TypeScript's `__importDefault` interop helper alongside Babel's `_interopRequireDefault`. Files compiled through `tsc` / `ts-jest` (which emit `var sc_1 = __importDefault(require('styled-components'))`) now flow into the same detection path as Babel-compiled output, so styled declarations downstream pick up `displayName` and `componentId` as expected.

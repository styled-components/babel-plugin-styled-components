// Regression: the TypeScript compiler emits `__importDefault` as its CommonJS
// interop helper (Babel uses `_interopRequireDefault`). Both wrap a require()
// to expose `.default`, and the plugin needs to recognize either form so that
// downstream styled-component detection on `<local>.default.div` succeeds.
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
var styled_components_1 = __importDefault(require("styled-components"));
var Foo = styled_components_1.default.div.withConfig({
  displayName: "Foo",
  componentId: "sc-1km53of-0"
})`color:red;`;
var Bar = (0, styled_components_1.default)('span').withConfig({
  displayName: "Bar",
  componentId: "sc-1km53of-1"
})`color:blue;`;

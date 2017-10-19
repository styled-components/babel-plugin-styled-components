const styled_default = require("styled-components/no-parser");

const TestNormal = styled.div.withConfig({
  displayName: "before__TestNormal",
  componentId: "y0c69d-0"
})([["{width: 100%;}"]]);

const Test = styled_default.default.div.withConfig({
  displayName: "before__Test",
  componentId: "y0c69d-1"
})([["{width: 100%;}"]]);

const TestCallExpression = styled_default.default(Test).withConfig({
  displayName: "before__TestCallExpression",
  componentId: "y0c69d-2"
})([["{height: 20px;}"]]);
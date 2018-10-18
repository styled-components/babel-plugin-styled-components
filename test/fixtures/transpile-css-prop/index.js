/*
 * Basic fixtures
 */

const StaticString = p => <p css="flex: 1;">A</p>

const StaticTemplate = p => (
  <p
    css={`
      flex: 1;
    `}
  >
    A
  </p>
)

const ObjectProp = p => <p css={{ color: 'blue' }}>A</p>

const NoChildren = p => <p css="flex: 1;" />

const CssHelperProp = p => (
  <p
    css={css`
      color: blue;
    `}
  >
    A
  </p>
)

/*
 * Dynamic prop
 */

const CustomComp = p => <Paragraph css="flex: 1">H</Paragraph>

const DynamicProp = p => <p css={props.cssText}>H</p>

const LocalInterpolation = p => (
  <p
    css={`
      background: ${props.bg};
    `}
  >
    H
  </p>
)

const FuncInterpolation = p => (
  <p
    css={`
      color: ${p => p.theme.a};
    `}
  >
    H
  </p>
)

const radius = 10
const GlobalInterpolation = p => (
  <p
    css={`
      border-radius: ${radius}px;
    `}
  >
    H
  </p>
)

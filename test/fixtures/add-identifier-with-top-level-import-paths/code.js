import styledA from '@xstyled/styled-components/test'
import styledB from '@xstyled/styled-components-test'
import styledC from '@xstyled/styled-components'

const Test = styledA.div`
  width: 100%;
`
const Test2 = true ? styledA.div`` : styledC.div``
const styles = { One: styledA.div`` }
let Component
Component = styledC.div``
const WrappedComponent = styledC(Inner)``
const NoTransformComponent = styledB.div``;

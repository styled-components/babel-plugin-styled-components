import * as styled from 'styled-components'

const Foo = () => null

const Called = styled.default(Foo)`color: red;`
const App = () => <div css="color: blue;" />

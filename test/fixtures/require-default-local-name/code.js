const sc = require('styled-components')

const Foo = () => null

const Global = styled(Foo)`color: red;`
const Member = sc.default.h1`color: blue;`
const Called = sc.default(Foo)`color: green;`
const Direct = sc(Foo)`color: black;`

const styled = require('styled-components')

const Foo = () => null

const Called = styled.default(Foo)`color: red;`
const CalledObject = styled.default(Foo)({ color: 'blue' })
const CalledChained = styled.default(Foo).attrs({})`color: green;`
const CalledSequence = (0, styled.default)(Foo)`color: red;`
const Tagged = styled.default.div`color: red;`

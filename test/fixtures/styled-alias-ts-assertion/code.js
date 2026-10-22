import baseStyled from 'styled-components'

const styled = baseStyled as any
const satisfied = baseStyled satisfies any

const Foo = styled.div`color: red;`
const Bar = satisfied.span`color: blue;`
const helper = styled.isStyledComponent(Foo)

import styled from 'styled-components'

const Tag = styled.div`color: red;`
const Extra = styled.notAnExport`color: blue;`
const helper = styled.isStyledComponent(Tag)
const owned = styled.hasOwnProperty('div')

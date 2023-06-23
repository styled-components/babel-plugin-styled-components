import s, { styled } from 'styled-components'

const DefaultImportButton = s.button.withConfig({
  displayName: 'code__DefaultImportButton',
})(['background:cornflowerblue;'])

const NamedImportButton = styled.button.withConfig({
  displayName: 'code__NamedImportButton',
})(['background:cornflowerblue;'])

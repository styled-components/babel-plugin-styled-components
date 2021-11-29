import { styled as matStyled } from '@mui/material/styles';
import sc from '@mui/material/styles';
const Test1 = matStyled('div').withConfig({
  displayName: 'Test1',
  componentId: 'sc-2jen0y-0',
})({
  width: '100%'
});
const Test2 = sc('div').withConfig({
  displayName: 'Test2',
  componentId: 'sc-2jen0y-1',
})({
  width: '100%'
});

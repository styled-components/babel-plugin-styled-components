import styled from 'styled-components';
const Tag = styled.div.withConfig({
  displayName: "code__Tag",
  componentId: "sc-1awywoz-0"
})(["color: red;"]);
const Extra = styled.notAnExport.withConfig({
  displayName: "code__Extra",
  componentId: "sc-1awywoz-1"
})(["color: blue;"]);
const helper = styled.isStyledComponent(Tag);
const owned = styled.hasOwnProperty('div');

import styled from '../../forked/qux-bar/styled';
const Test = styled.div.withConfig({
  componentId: "sc-c384rv-0"
})`width:100%;`;
const Test2 = true ? styled.div.withConfig({
  componentId: "sc-c384rv-1"
})`` : styled.div.withConfig({
  componentId: "sc-c384rv-2"
})``;
const styles = {
  One: styled.div.withConfig({
    componentId: "sc-c384rv-3"
  })``
};
let Component;
Component = styled.div.withConfig({
  componentId: "sc-c384rv-4"
})``;
const WrappedComponent = styled(Inner).withConfig({
  componentId: "sc-c384rv-5"
})``;

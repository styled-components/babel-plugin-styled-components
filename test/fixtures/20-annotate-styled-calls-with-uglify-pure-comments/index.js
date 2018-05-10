const Test = styled.div`width: 100%;`;
const Test2 = styled('div')``;
const Test3 = true ? styled.div`` : styled.div``;
const styles = { One: styled.div`` }
let Component;
Component = styled.div``;
const WrappedComponent = styled(Inner)``;
const notStyled = styled.div(''); // not transpiled by styled components but should add pure comment
const normalFunc = add(5,3);

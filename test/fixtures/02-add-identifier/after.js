const Test = styled.div.withConfig({
  componentId: "Test-SHORTID"
})`width: 100%;`;
const Test2 = true ? styled.div.withConfig({
  componentId: "Test2-SHORTID"
})`` : styled.div.withConfig({
  componentId: "Test2-SHORTID"
})``;
const styles = { One: styled.div.withConfig({
    componentId: "One-SHORTID"
  })`` };
let Component;
Component = styled.div.withConfig({
  componentId: "Component-SHORTID"
})``;
const WrappedComponent = styled(Inner).withConfig({
  componentId: "WrappedComponent-SHORTID"
})``;

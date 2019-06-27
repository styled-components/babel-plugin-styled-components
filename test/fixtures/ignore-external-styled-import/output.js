import { styled } from '@material/ui';

const Foo = p => <div {...p} />;

const TestNormal = styled(Foo).withConfig({
  displayName: "code__TestNormal",
  componentId: "sc-10i7tpl-0"
})({
  color: red
});

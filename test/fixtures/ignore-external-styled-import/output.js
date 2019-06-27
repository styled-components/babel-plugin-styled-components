import { styled } from '@material/ui';

const Foo = p => <div {...p} />;

const TestNormal = styled(Foo)({
  color: red
});

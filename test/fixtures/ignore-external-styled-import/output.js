import { styled } from '@material/ui';
import s from 'styled-components';
const Paragraph = s.p.withConfig({
  displayName: "code__Paragraph",
  componentId: "sc-10i7tpl-0"
})(["color:green;"]);

const Foo = p => <Paragraph {...p} />;

const TestNormal = styled(Foo)({
  color: red
});

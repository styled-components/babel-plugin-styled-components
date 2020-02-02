import _styled from "styled-components/native";
import styled from "styled-components/native";
import { View, Text } from 'react-native';

var _StyledText = styled(Text).withConfig({
  displayName: "code___StyledText",
  componentId: "sc-1awg5ug-0"
})(["color:red"]);

const WrappedText = () => <_StyledText>Hello World</_StyledText>;

const WrappedView = styled(View).withConfig({
  displayName: "code__WrappedView",
  componentId: "sc-1awg5ug-1"
})(["background-color:blue;"]);

import styled from "styled-components/native";
import { View, Text } from 'react-native';

const WrappedText = () => (
  <Text css={css`color: red`}>Hello World</Text>
);
const WrappedView = styled(View)`background-color: blue;`;


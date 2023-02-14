import { StyleSheet } from "react-native"
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({theme}) => theme.COLORS.WHITE};
  width: 100%;
  height: 60px;
`;

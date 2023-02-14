import { StyleSheet } from "react-native";
import styled from "styled-components/native";


export const Container = styled.View`
    margin-bottom: 20px; 
`;

export const CourtContainer = styled.View`
  background-color: ${({theme}) => theme.COLORS.WHITE};
  align-items: 'center';
  justify-content: 'center';
  width: 146px;
  height: 120px;
  border-top-left-radius: ${({theme}) => theme.BORDER_RADIUS}px;
  border-top-right-radius: ${({theme}) => theme.BORDER_RADIUS}px;
`;

export const NameCourt = styled.Text`
  text-align: center;
  width: 100%;
`;

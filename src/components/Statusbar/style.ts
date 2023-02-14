
import { StyleSheet, Text } from 'react-native';
import styled from "styled-components/native";


export const ContainerStatusBar = styled.View`
  flex-direction: row;
  background: ${({theme}) => theme.COLORS.YELLOW};
  justify-content: space-around;
  align-items: center;
  height: 25px;
  border-bottom-left-radius: ${({theme}) => theme.BORDER_RADIUS}px;
  border-bottom-right-radius: ${({theme}) => theme.BORDER_RADIUS}px; 
`;

export const TextStatusbar = styled.Text`
  color: ${({theme}) => theme.COLORS.BLACK_900};
  font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
`;

export const StatusGame = styled.View`
  padding: 2px 6px;
  border-radius: ${({theme}) => theme.BORDER_RADIUS}px;
`;

export const TextGame = styled.Text`
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  color: ${({theme}) => theme.COLORS.BLACK_900};
`;

export const styles = StyleSheet.create({

  textGame: {
    color: '#fff',
    fontSize: 9,    
  },

  statusBar: {
    fontWeight: 'bold',
    color: "#4F4F4F",
    fontSize: 12
  }
})
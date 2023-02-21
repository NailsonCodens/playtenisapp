import { StyleSheet, TouchableOpacity } from "react-native"
import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_100};
    width: 100%;
    height: 100%;
`;

export const ContainerScroll = styled.ScrollView`
    padding:0px 10px;
`;

export const Courts = styled.View`
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 0px;
`;

export const ContainerQueues = styled.View`
  flex-direction: row;
`;

export const QueueBox = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.WHITE};
  width: 100%;
  height: 150px;
  border-radius: ${({theme}) => theme.BORDER_RADIUS}px;
  padding: 20px;
`;


export const QueueCol = styled.Text`
  width: 100%;
`;


export const TextQueue = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
  color: ${({theme}) => theme.COLORS.BLACK_900};
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
`;

export const ButtonJoinQueue = styled(TouchableOpacity)`
  background-color: ${({theme}) => theme.COLORS.BLUE};
  width: 145px;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  border-radius: ${({theme}) => theme.BORDER_RADIUS}px;
`;

export const TextButtonJoinQueue = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
  color: ${({theme}) => theme.COLORS.WHITE};
  text-align: center;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  padding: 20px;
`;

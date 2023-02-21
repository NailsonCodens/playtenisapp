import { StyleSheet, TouchableOpacity } from "react-native"
import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_100};
    width: 100%;
    height: 100%;
`;

export const ContainerScroll = styled.ScrollView`
    padding:0px 0px;
`;

export const Courts = styled.View`
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 00px 0px;
`;

export const ContainerQueues = styled.View`
  flex-direction: row;
  margin: 4px;
`;

export const QueueBox = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.WHITE};
  width: 100%;
  height: 228px;
  border-radius: ${({theme}) => theme.BORDER_RADIUS}px;
  padding: 20px;
`;

export const QueueRow = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const QueueCol = styled.Text`
  width: 100%;
  margin-bottom: 5px;
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  color: ${({theme}) => theme.COLORS.BLACK_900};
  font-family: ${({theme}) => theme.FONT_FAMILY.SEMIBOLD};  
`;


export const TextQueue = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
  color: ${({theme}) => theme.COLORS.BLACK_900};
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  margin-bottom: 5px;
`;

export const ButtonJoinQueue = styled(TouchableOpacity)`
  background-color: ${({theme}) => theme.COLORS.BLUE};
  width: 20%;
  align-items: center;
  justify-content: center;
  margin-left:8px;
  border-radius: ${({theme}) => theme.BORDER_RADIUS}px;
`;

export const TextButtonJoinQueue = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
  color: ${({theme}) => theme.COLORS.WHITE};
  text-align: center;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  padding: 20px;
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
  margin-top: 4px;
  margin-right: 10px;
`;

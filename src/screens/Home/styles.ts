import { StyleSheet } from "react-native"
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

export const styles = StyleSheet.create({


})
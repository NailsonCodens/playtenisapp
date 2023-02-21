import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import styled, { css } from "styled-components/native";


export type FontWheightTypeText = 'BOLD' | 'REGULAR';

type Props = {
  weight?: FontWheightTypeText,
}


export const Container = styled(TouchableOpacity)`
  margin-bottom: 20px;
  margin: 4px;
  width: 14%;
`;

export const CourtContainer = styled.View`
  background-color: ${({theme}) => theme.COLORS.WHITE};
  align-items: center;
  justify-content: center;
  height: 185px;
  margin-top: 5px;
  border-top-left-radius: ${({theme}) => theme.BORDER_RADIUS}px;
  border-top-right-radius: ${({theme}) => theme.BORDER_RADIUS}px;
`;

export const NameCourt = styled(Text)<Props>`
  font-family: ${({theme, weight}) =>  weight === 'BOLD' ? theme.FONT_FAMILY.BOLD : theme.FONT_FAMILY.REGULAR};
  ${({theme, weight}) => css`
    font-size:  ${theme.FONT_SIZE.MD}px};
  `};
`;

export const PlayersCourt = styled(Text)<Props>`
  font-family: ${({theme, weight}) =>  weight === 'BOLD' ? theme.FONT_FAMILY.BOLD : theme.FONT_FAMILY.REGULAR};
  ${({theme, weight}) => css`
    font-size:  ${theme.FONT_SIZE.SM}px};
  `};
`;

export const ContainerText = styled.View`
  width: 100%;
  margin: 0px 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


export const Icon = styled.Image`
  width: 17px;
  height: 17px;
  margin: 2px;
`;

export const CourtImage = styled.Image`
  width: 75px;
  height: 50px;
  margin-bottom: 2px;
`;
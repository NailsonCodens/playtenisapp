import styled, { css } from 'styled-components/native';
import {X} from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
`;

export const Title = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.BLACK_900};
  `};
`;

export const ButtonClose = styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const IconClose = styled(X).attrs(({theme}) => ({
  size: 32,
  color: theme.COLORS.BLACK_900,
}))``;
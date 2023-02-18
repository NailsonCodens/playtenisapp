import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
  ${({theme}) => css`
    background-color: ${theme.COLORS.BLUE};
    border-radius: ${theme.BORDER_RADIUS}px;
  `}
  margin-top: 30px;
  height: 52px;
  justify-content: center;
  align-items: center;  
`;

export const Title = styled.Text`
  ${({theme}) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;
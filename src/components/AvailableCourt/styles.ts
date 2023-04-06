import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
  ${({theme}) => css`
    background-color: ${theme.COLORS.GREEN};
    border-radius: ${theme.BORDER_RADIUS}px;
  `}
  height: 52px;
  justify-content: center;
  align-items: center;  
  flex-direction:row;
`;

export const Title = styled.Text`
  ${({theme}) => css`
    color: ${theme.COLORS.BLACK_900};
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;

export const Image = styled.Image`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;
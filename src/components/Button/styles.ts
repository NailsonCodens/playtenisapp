import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export type styleTypeButton = true | false;

type Props = {
  redButton?: styleTypeButton,   
};

export const Container = styled(TouchableOpacity)<Props>`
  ${({theme, redButton}) => css`
    background-color: ${ redButton === true ? theme.COLORS.RED : theme.COLORS.BLUE};
    border-radius: ${theme.BORDER_RADIUS}px;
    margin: ${ redButton === true ? '10px' : '0px'};
  `}
  padding: 0px 10px;
  margin-top: 20px;
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
import styled, { css } from "styled-components/native";
import { TouchableOpacity } from 'react-native';

export type ButtonCourtsTypeStyleProps = 'SELECTED' | 'UNSELECTED';

type Props = {
  type: ButtonCourtsTypeStyleProps,
}

export const ContainerRadioButton = styled(TouchableOpacity)<Props>`
  ${({theme, type}) => css`
    background: ${type ===  'SELECTED' ? theme.COLORS.GREEN : theme.COLORS.WHITE};
    border: 2px solid ${ type === 'SELECTED' ? theme.COLORS.GREEN : theme.COLORS.BLACK_900};
  `}
  height: 50px;
  margin: 5px;
  border-radius: 4px;
  padding: 0px 10px;
`;

export const TitleButton = styled.Text<Props>`
   ${({theme, type}) => css`
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${type === 'SELECTED' ? theme.COLORS.WHITE : theme.COLORS.BLACK_900};
  `} 
  margin-top: 10px;
`;
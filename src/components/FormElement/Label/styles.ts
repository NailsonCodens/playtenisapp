import styled, { css } from 'styled-components/native';
import { Text } from 'react-native';

export type LabelTypeStyleProps = true | false;

type Props = {
  type: LabelTypeStyleProps,
}

export const LabelText = styled(Text)<Props>`
  ${({theme, type}) => css`
    color: ${type === false ? theme.COLORS.BLACK_900 : theme.COLORS.ORANGE};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    padding-bottom: 10px;
  `};
`;

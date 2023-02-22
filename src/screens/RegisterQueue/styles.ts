import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;
export const SubTitle = styled.Text`
  ${({theme}) => css`
    color: ${theme.COLORS.RED};
    font-size: ${theme.FONT_SIZE.MD}px;};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    margin: 0px 0px;
`};
`;
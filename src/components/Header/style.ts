import styled, { css } from "styled-components/native";

export const Container = styled.View`
  background-color: ${({theme}) => theme.COLORS.WHITE};
  width: 100%;
  height: 60px;
`;

export const Title = styled.Text`
  ${({theme}) => css`
    color: ${theme.COLORS.BLACK_900};
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
  text-align: center;
  margin-top: 10px;
`;

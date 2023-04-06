import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 500px;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-top: 10%;
  height: 100px;
  ${({theme}) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
  `};
`;

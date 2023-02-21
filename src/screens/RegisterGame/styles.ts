import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;

export const Label = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.BLACK_900};
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `}
`;

export const ColumnGroup = styled.View`
  background-color: red;
`;

export const ContainerModal = styled.View`
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const BodyModal = styled.View`
  width: 70%;
  padding: 10%;
  align-items: center;
  justify-content: center;
  ${({theme}) => css`
    background: ${theme.COLORS.WHITE};
    border-radius: ${theme.BORDER_RADIUS}px;  
  `};
`;

export const TitleModal = styled.Text`
  ${({theme}) => css`
    color: ${theme.COLORS.GREEN};
    font-size: 30px;
    font-family: ${theme.FONT_FAMILY.SEMIBOLD};
  `};  
`;

export const ContainerNameCourt = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const Title = styled.Text`
  ${({theme}) => css`
    color: ${theme.COLORS.BLACK_900};
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;

export const Image = styled.Image`
  width: 35px;
  height: 35px;
  margin-left: 10px;
  margin-top: -10px;
`;

export const ContainerTime = styled.Text`
  ${({theme}) => css`
    color: ${theme.COLORS.BLACK_900};
    font-size: 50px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    margin-top: 20px;
  `}
`;

export const TextMotivation = styled.Text`
  width: 80%;
  text-align: center;
  ${({theme}) => css`
    color: ${theme.COLORS.BLACK_900};
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    margin-top: 20px;
  `}  
`;

export const CourtImage = styled.Image`
  width: 150px;
  height: 100px;
  margin-bottom: 2px;
`;
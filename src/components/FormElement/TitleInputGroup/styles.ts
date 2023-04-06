import styled from 'styled-components/native';

export const Text = styled.Text`
  
  color: ${({theme}) => theme.COLORS.BLACK_900};
  font-family: ${({theme}) => theme.FONT_FAMILY.SEMIBOLD};
  font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
  margin: 5px 5px;
  margin-top: 5px;
`;

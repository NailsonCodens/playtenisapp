import styled from 'styled-components/native';

export const Text = styled.Text`
  
  color: ${({theme}) => theme.COLORS.BLACK_900};
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
  padding-bottom: 10px;
  
`;

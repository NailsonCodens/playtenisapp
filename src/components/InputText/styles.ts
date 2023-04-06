import {TextInput} from 'react-native';
import styled from 'styled-components';

export const Container = styled(TextInput)`
  width: 100%;
  min-height: 52px;
  max-height: 52px;
  border-radius: ${({theme}) => theme.BORDER_RADIUS}px;
  border: 1px solid ${({theme}) => theme.COLORS.BLACK_900};
  padding: 0px 12px;
`;

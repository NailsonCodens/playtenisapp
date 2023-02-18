import { TouchableOpacityProps } from 'react-native';
import { Container, Title, Image } from "./styles";
import tenisBall from '../../assets/tennisball.png';

type Props = TouchableOpacityProps & {
  court: string;
};

export function AvailableCourt({court, ...rest}: Props){
  return(
    <Container
      {...rest}
    >
      <Title>{court}</Title>
      <Image source={tenisBall}/>
    </Container>
  )
}
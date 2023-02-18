import {TouchableOpacityProps} from  'react-native';
import { Title, Container, ButtonClose, IconClose } from "./style"
import { useNavigation } from '@react-navigation/native';

type Props =  TouchableOpacityProps &{
  title: string,
}

export function HeaderRegisterGame({title, ...rest}: Props) {
  const navigator = useNavigation();

  function handleGoHome(){
    navigator.navigate('home')
  }

  return(
    <Container>
      <Title>{title}</Title>
      <ButtonClose
       onPress={handleGoHome}
      >
        <IconClose/>
      </ButtonClose>
    </Container>
  )
}
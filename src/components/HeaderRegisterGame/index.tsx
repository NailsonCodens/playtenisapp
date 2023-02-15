import {TouchableOpacityProps} from  'react-native';
import { Title, Container, ButtonClose, IconClose } from "./style"

type Props =  TouchableOpacityProps &{
  title: string,
}

export function HeaderRegisterGame({title, ...rest}: Props) {
  return(
    <Container
    >
      <Title>{title}</Title>
      <ButtonClose
        {...rest}
      >
        <IconClose/>
      </ButtonClose>
    </Container>
  )
}
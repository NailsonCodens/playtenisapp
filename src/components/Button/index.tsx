import { TouchableOpacityProps } from 'react-native';
import { Container, styleTypeButton, Title } from "./styles";

type Props = TouchableOpacityProps &{
  title: string;
  redButton?: styleTypeButton;
};

export function Button({title, redButton, ...rest}: Props){
  console.log(redButton);
  return(
    <Container
      redButton={redButton}
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  )
}
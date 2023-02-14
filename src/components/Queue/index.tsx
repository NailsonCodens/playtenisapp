import { View, Text, TouchableOpacity } from "react-native";
import { ContainerQueues, QueueBox, TextQueue, ButtonJoinQueue, TextButtonJoinQueue} from './style';

export function Queue(){
  return(
    <ContainerQueues>
      <QueueBox>
        <TextQueue>Fila de espera</TextQueue>        
      </QueueBox>
      <ButtonJoinQueue>
        <TextButtonJoinQueue>Entrar na fila de espera</TextButtonJoinQueue>
      </ButtonJoinQueue>
    </ContainerQueues>

  )
}
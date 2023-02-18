import { ContainerQueues, QueueBox, TextQueue, ButtonJoinQueue, TextButtonJoinQueue} from './style';
import { useNavigation } from '@react-navigation/native';

export function Queue(){
  const navigator = useNavigation();

  function handleRegisterQueue(){
    navigator.navigate('queue');
  }

  return(
    <ContainerQueues>
      <QueueBox>
        <TextQueue>Fila de espera</TextQueue>        
      </QueueBox>
      <ButtonJoinQueue
        onPress={handleRegisterQueue}
      >
        <TextButtonJoinQueue>Entrar na fila de espera</TextButtonJoinQueue>
      </ButtonJoinQueue>
    </ContainerQueues>

  )
}
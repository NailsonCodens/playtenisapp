
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {Header} from '../../components/Header'
import { ButtonJoinQueue, Container, ContainerQueues, ContainerScroll, Courts, Icon, QueueBox, QueueCol, QueueRow, TextButtonJoinQueue, TextQueue} from './styles';
import { Court } from '../../components/Court';
import { api } from '../../services/api';
import { useCallback, useEffect, useState } from 'react';
import { courtsType } from '../../dtos/courtsDTO';
import { Alert } from 'react-native';
import { queueType } from '../../dtos/queueDTO';
import playersImage from '../../assets/players.png';


type playerMap = {
  id: number,
  name: string,
}

export function Home (){

  const navigator = useNavigation();
  const [courts, setCourts] = useState<courtsType[]>([]);
  const [queue, setQueue] = useState<queueType[]>([]);
  const [reload, setReload] = useState(false);
  async function fetchCourts(){
    const response = await api.get('courts');
    setCourts(response.data.list)
  }

  async function fetchQueue(){
    const response = await api.get('/queue/');
    setQueue(response.data)
  }

  async function handleRegister(courtId: string){
    const response = await api.get(`/games/game-court-current/${courtId}`);

    const {game} = response.data;
    const {court} = response.data;

    if(game){
      return Alert.alert('Quadras', 'Quadra ocupada. seleciona uma disponível ou entre na fila de espera');
    }

    const { status } = response.data.court;

    if(status === 'off'){
      return Alert.alert('Quadras', 'Esta quadra não está disponível');
    }

    navigator.navigate('register', {courtId: courtId, courtName: court.name});
  }

  function handleRegisterQueue(){
    navigator.navigate('queue');
  }

  useFocusEffect(useCallback(() => {
    fetchCourts();
    setReload(true);
  }, []));

  useFocusEffect(useCallback(() => {
    fetchQueue();
  }, []));

  function renderColumnsQueue(players){
    let arrayPlayers: string[] = [];

    players.map(player => {
      arrayPlayers.push(player.name)
    });

    const playersTogether = arrayPlayers.join(' x ')

    if(playersTogether){
      return (
        <QueueRow key={playersTogether}>
          <Icon source={playersImage}/>        
          <QueueCol>{playersTogether}</QueueCol>
        </QueueRow>  
      )  
    }
  }

  return(
    <Container>
      <Header/>
      <ContainerScroll 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <Courts>
          {
            courts.map(court => (
              <Court
                key={court.id}
                id={court.id}
                name={court.name}
                onPress={() => handleRegister(court.id)}
                reloadCourts={reload}
                reloadFetchCourts={() => fetchCourts()}
              />
            ))
          }                                      
        </Courts>
      </ContainerScroll>
      <ContainerQueues>
        <QueueBox>
          <TextQueue>Fila de espera</TextQueue>
          {
            queue.map(queue => { return renderColumnsQueue(queue.players)})
          }
        </QueueBox>
        <ButtonJoinQueue
          onPress={handleRegisterQueue}
        >
          <TextButtonJoinQueue>Entrar na fila de espera</TextButtonJoinQueue>
        </ButtonJoinQueue>
      </ContainerQueues>
     </Container>
  )
}
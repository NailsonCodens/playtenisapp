
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {Header} from '../../components/Header'
import { ButtonJoinQueue, Container, ContainerQueues, ContainerScroll, Courts, Icon, QueueBox, QueueCol, QueueRow, TextButtonJoinQueue, TextQueue} from './styles';
import { Court } from '../../components/Court';
import { api } from '../../services/api';
import { useCallback, useEffect, useState } from 'react';
import { courtsType } from '../../dtos/courtsDTO';
import { Alert, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { queueType } from '../../dtos/queueDTO';
import playersImage from '../../assets/players.png';
import { Button } from '../../components/Button';


type playerMap = {
  id: number,
  name: string,
}

export function Home (){

  const navigator = useNavigation();
  const [courts, setCourts] = useState<courtsType[]>([]);
  const [queue, setQueue] = useState<queueType[]>([]);
  const [reload, setReload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showButton, setShowButton] = useState<boolean>(true);

  async function fetchCourts(){
    console.log('executou');
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

  function handleSendRegisterGameBeforeQueue(id: string){
    console.log('vou mandar para a página que registra o jogo com todos os dados cadastrados já');
    navigator.navigate('gamequeue', { queueId: id });
  }

  function checkQueueExists(){
    console.log('aaaaaa');

    if(queue.length > 0){
      setShowButton(true);
      console.log('libera botão apenas pro primeiro grupo  da fila de espera.');
    }
  }

  function renderColumnsQueue(players, id){
    let arrayPlayers: string[] = [];

    players.map(player => {
      arrayPlayers.push(player.name)
    });

    const playersTogether = arrayPlayers.join(' x ')

    if(playersTogether){
      return (
        <QueueRow key={playersTogether}>
          <QueueCol><Icon source={playersImage}/></QueueCol>        
          <QueueCol>{playersTogether}</QueueCol>
          <QueueCol>
            {
              showButton ? 
              <TouchableOpacity
                onPress={() => handleSendRegisterGameBeforeQueue(id)}
              >
                <Text>Quadra liberada!</Text>
              </TouchableOpacity>
              : 
              <></>
            }
          </QueueCol>
        </QueueRow>  
      )  
    }
  }

  function renderCourt(court){
    return (
      <Court
        key={court.id}
        id={court.id}
        name={court.name}
        data={court}
        onPress={() => handleRegister(court.id)}
        reloadCourts={reload}
        reloadFetchCourts={() => fetchCourts()}
        checkQueue={() => checkQueueExists()}
    />      
    );    
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchCourts();
      setReload(true);
      setRefreshing(false);
    }, 2000);
    setReload(false);
  }, []);

  useFocusEffect(useCallback(() => {
    fetchCourts();
  }, []));

  useFocusEffect(useCallback(() => {
    fetchQueue();
  }, []));

  return(
    <Container>
      <Header/>
      <ContainerScroll 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }        
      >
        <Courts>
          {
            courts.map(court => 
              {return renderCourt(court)}
            )
          }                                      
        </Courts>
      </ContainerScroll>
      <ContainerQueues>
        <QueueBox>
          <TextQueue>Fila de espera</TextQueue>
          {
            queue.map(queue => { return renderColumnsQueue(queue.players, queue.id)})
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
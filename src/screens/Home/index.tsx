
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {Header} from '../../components/Header'
import { ButtonJoinQueue, ButtonLeaveQueue, Container, ContainerQueues, ContainerScroll, Courts, Icon, QueueBox, QueueCol, QueueRow, TextButtonJoinQueue, TextButtonLeaveQueue, TextQueue} from './styles';
import { Court } from '../../components/Court';
import { api } from '../../services/api';
import { useCallback, useEffect, useState } from 'react';
import { courtsType } from '../../dtos/courtsDTO';
import { Alert, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { queueType } from '../../dtos/queueDTO';
import playersImage from '../../assets/players.png';
import { Button } from '../../components/Button';
import io from 'socket.io-client';
import { Court2, DataObject } from '../../components/Court2';
import socketio from '../../services/socket.io';


type typePlayerHome = {
  name: string,
}

type typeCourt = {
  id: string,
  name: string,
  status: string,
  game: DataObject
};

export function Home (){

  const navigator = useNavigation();
  const [courts, setCourts] = useState<courtsType[]>([]);
  const [queue, setQueue] = useState<queueType[]>([]);
  const [reload, setReload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [reloadCourtsSocket, setReloadCourtsSocket] = useState<boolean>(false);
  const [countCourtWithGame, setCountCourtWithGame] = useState<number>(0);

  async function fetchCourts(){
    const response = await api.get('courts');
    fetchCount();    
    setCourts(response.data.list)
  }

  async function fetchQueue(){
    const response = await api.get('/queue/');

    setQueue(response.data)
  }

  async function fetchCount(){
    const response = await api.get('/courts/count/with-games');
    setCountCourtWithGame(response.data);
  }

  async function handleRegister(courtId: string){
    const response = await api.get(`/games/game-court-current/${courtId}`);

    const {game} = response.data;
    const {court} = response.data;

    if(game){
      return Alert.alert('Quadras', 'Quadra ocupada, veja se tem alguma outra disponível ou entre na fila de espera!');
    }


    if(!game && queue.length > 0){
      return Alert.alert('Quadras', 'Tem jogadores na sua frente, entre na fila de espera e aguarde a sua vez!');

    }

    const { status } = response.data.court;

    if(status === 'off'){
      return Alert.alert('Quadras', 'Esta quadra não está disponível');
    }

    navigator.navigate('register', {courtId: courtId, courtName: court.name});
  }

  function handleRegisterQueue(){
    if(countCourtWithGame === 0){
      return Alert.alert('Fila de espera', 'Tem quadra disponível, selecione uma e comece seu jogo agora mesmo!');
    }

    navigator.navigate('queue');
  }

  function handleSendRegisterGameBeforeQueue(id: string){
    navigator.navigate('gamequeue', { queueId: id });
  }

  function checkQueueExists(){
    console.log('check queue exists');

    if(queue.length > 0){
      setShowButton(true);
      console.log('libera botão apenas pro primeiro grupo  da fila de espera.');
    }

    if(queue.length <= 0){
      setShowButton(false);
      console.log('esconde o botão pq nao tem mais fila de espera');
    }    
  }

  function renderColumnsQueue(players: string[], id: string, key: number){

    let arrayPlayers: string[] = [];

    players.map((player) => {
      const newObjectPlayers: typePlayerHome = Object(player);

      arrayPlayers.push(newObjectPlayers.name)
    });

    const playersTogether = arrayPlayers.join(' x ')

    if(playersTogether){
      return (
        <QueueRow key={playersTogether}>
          <QueueCol><Icon source={playersImage}/></QueueCol>        
          <QueueCol>{playersTogether}</QueueCol>
          <QueueCol>
            {
              key === 0 ? 
                showButton? 
                <ButtonLeaveQueue
                  onPress={() => handleSendRegisterGameBeforeQueue(id)}
                >
                  <TextButtonLeaveQueue>Quadras liberadas!</TextButtonLeaveQueue>
                </ButtonLeaveQueue>
                : 
                <></>
              :
              <></>
            }
          </QueueCol>
        </QueueRow>  
      )  
    }
  }

  function renderCourt(court: typeCourt){
    {
      /*
        
      */
    }

    return (
      <Court
      key={court.id}
      id={court.id}
      name={court.name}
      status={court.status}
      onPress={() => handleRegister(court.id)}
      reloadCourts={reload}
      reloadFetchCourts={() => fetchCourts()}
      checkQueue={() => checkQueueExists()}
    />  
    );

    /*
    return (
      <Court2 
        key={court.id} 
        data={court.game} 
        status={court.status} 
        name={court.name}
        court={court}
        />
    );*/
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchCourts();
      fetchQueue();
      setReload(true);
      setRefreshing(false);
    }, 1000);
    setReload(false);
  }, []);

  useFocusEffect(useCallback(() => {
    fetchCourts();
  }, []));

  useFocusEffect(useCallback(() => {
    fetchQueue();
  }, []));

  async function reloadFetchCourts(data){
    const response = await api.get('courts');
    setReload(true);
    setCourts(response.data.list)
  }

  useEffect(() => {
    socketio.on("reloadResponse", (data) => {
      setReload(true);
      reloadFetchCourts(data);
      setReload(false);
    });

    return () => {
      socketio.off('reloadApp')
      socketio.off('reloadResponse')
      setReload(false);
    }   
  }, [socketio, reloadCourtsSocket]);

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
            queue.map((queue, key) => { return renderColumnsQueue(queue.players, queue.id, key)})
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
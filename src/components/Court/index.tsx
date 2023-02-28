import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from 'dayjs';
import { TouchableOpacityProps, Text, Alert } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { Container, CourtContainer, NameCourt, CourtImage, ContainerText, PlayersCourt, Icon } from './style';
import { StatusBar } from "../Statusbar";

import { api } from '../../services/api';

import coutImage from '../../assets/court.png';
import timeImage from '../../assets/time.png';
import tennisBall from '../../assets/tennisball.png';
import playersImage from '../../assets/players.png';

import { colorsCourt } from '../../utils/colorsCourt';
import { statusCourtText } from '../../utils/statusCourtText';
import { statusGame } from '../../utils/statusGame';
import { useFocusEffect } from '@react-navigation/native';

type Props = TouchableOpacityProps & {
  id: string,
  name: string,
  status: string,
  reloadCourts: boolean,
  reloadFetchCourts: () => void,
  checkQueue: () => void,
}

export type courtPropsDTO = {
  id: string;
  name: string;
  status: string;
}

type gamePropsDTO = {
  start_time_game: string,
  end_time_game: string,
  time: number,
  players: [
    {
      id: string,
      type: string,
      name: string,
      registration: string,
    }    
  ]
};

type PlayersDTO = {
  id: string;
  type: string;
  name: string;
  registration: string;
  status: string;
};

export function Court ({id, name, status, reloadCourts, reloadFetchCourts, checkQueue, ...rest }: Props ){ 
  
  const testando = status;

  const [statusTest, setStatusTest] = useState(status);
  const [testeCourtApi, settesteCourtApi] = useState('-');
  const [gameCurrent, setGameCurrent] = useState<gamePropsDTO>();
  const [haveGame, setHaveGame] = useState<boolean>(false);
  const [players, setPlayers] = useState<PlayersDTO[]>([]);
  const [noGame, setNoGame] = useState('Sem jogo');

  const [statusBarColorCourt, setStatusBarColorCourt] = useState('');
  const [statusCourtBar, setStatusCourtBar] = useState('');
  const [statusGameBar, setStatusGameBar] = useState(statusGame.available);

  const [dateFinishGame, setDateFinishGame] = useState<string>(new Date().toISOString());
  const [timeGame, setTimeGame] = useState<number>(0);
  const [startDateGame, setStartDateGame] = useState('');
  const [endDateGame, setEndDateGame] = useState('');
  
  async function fetchStatusCourt(){
    console.log('to sendo executado');
    AsyncStorage.removeItem(`STATUS_COURT_${id}`);
    AsyncStorage.removeItem(`STATUS_GAME_${id}`);  
    
    const response = await api.get(`/games/game-court-current/${id}`);

    const {game, court} = response.data;

    let checkGame =  'no';

    if(game !== null){
      checkGame = 'yes';
    }else{
      checkGame = 'no';
    }

    setGameCurrent(game);

    game && game.players && setPlayers(game.players);

    await AsyncStorage.setItem(`STATUS_COURT_${court.id}`, court.status);
    await AsyncStorage.setItem(`STATUS_GAME_${court.id}`, checkGame);

   
    if(court.status === 'off' && game === null){
      cancelAllStatus();      
    }

    if(court.status === 'ok' && game === null){
      cancelAllStatus();      
    } 
   

    addColorCourtBarAndStatusCourtBar(game, court);
    mutateDataCourt(game);
  }

  function cancelAllStatus(){
    setHaveGame(false);
    setStatusAvailableCourtAfterCounterResets();
    setStartDateGame('');
    setEndDateGame('');
    /*reloadFetchCourts();*/   
    setTimeGame(0); 
    setPlayers([]);
    setNoGame('Sem jogo');    
    setHaveGame(false); 
  }

  function addColorCourtBarAndStatusCourtBar(game: gamePropsDTO, court: courtPropsDTO){
    if(!game){
      setStatusBarColorCourt(colorsCourt.available);
      setStatusCourtBar(statusCourtText.available);
      setStatusGameBar(statusGame.available);

      if(court.status === 'off'){
        setStatusBarColorCourt(colorsCourt.unavailable);
        setStatusCourtBar(statusCourtText.unavailable);
        setStatusGameBar(statusGame.unavailable);
      }
    }

    if(game){
      defineColorBarTextBarAndstatusGame(game);
      addDateFinishAndTimeGame(game);           
    }
  }

  function addDateFinishAndTimeGame(game: gamePropsDTO){
    setDateFinishGame(game.end_time_game);
    setTimeGame(game.time);
  }

  function mutateDataCourt(game: gamePropsDTO){
    if(game){
      setEndDateGame(dayjs(game.end_time_game).locale('pt-br').format('HH:mm'));
      setStartDateGame(dayjs(game.start_time_game).locale('pt-br').format('HH:mm'));
    }
  }

  function defineColorBarTextBarAndstatusGame(game: gamePropsDTO){
    const coach = game.players.find(player => player.type === 'coach');

    if(game.players.length > 0 && coach){
      /*
      setStatusBarColorCourt(colorsCourt.class);
      setStatusGameBar(statusGame.class);
      setStatusCourtBar(statusCourtText.inUse);*/

    }else{
      setStatusCourtBar(statusCourtText.inUse);
      setStatusBarColorCourt(colorsCourt.inUse); 

      changeStatusGame(game.time);
    }    
  }

  function changeStatusGame(time: number){
    if(time <= 16){
      setStatusGameBar(statusGame.closeEnd);
    }

    if(time > 16 && time < 40){
      setStatusGameBar(statusGame.inProgress);
    }
    
    if(time >= 40){
      setStatusGameBar(statusGame.start);
    }    
  }

  function setStatusAvailableCourtAfterCounterResets(){
    setStatusCourtBar(statusCourtText.available);
    setStatusBarColorCourt(colorsCourt.available);  
    setStatusGameBar(statusGame.available);
  }

  async function CounterTimeGame(){    

    const statusCortStorage = await AsyncStorage.getItem(`STATUS_COURT_${id}`);
    const statusGame = await AsyncStorage.getItem(`STATUS_GAME_${id}`);

    if(statusCortStorage !== 'off' && statusGame === 'yes'){
      console.log('executando aqui pq é diferente de off');
      const dateNow = dayjs();
      const dateGame = dayjs(dateFinishGame);
      const diffBetweenDate = dateGame.diff(dateNow, 'minute');  
      
      setTimeGame(diffBetweenDate);
      changeStatusGame(diffBetweenDate);
  
      if(diffBetweenDate === 0){
        setNoGame('Jogo acabando...');
        setTimeout(()=> {
          setStatusAvailableCourtAfterCounterResets();
          setStartDateGame('');
          setEndDateGame('');
          reloadFetchCourts();   
          setTimeGame(0); 
          setPlayers([]);
          checkQueue();
          setNoGame('Sem jogo');
          AsyncStorage.removeItem(`STATUS_COURT_${id}`);
          AsyncStorage.removeItem(`STATUS_GAME_${id}`);          
        }, 61000);
      }
    }else{
      console.log('Não posso contar');
    }
  }

  useFocusEffect(useCallback(() => {
    if(reloadCourts){
      console.log('recarregue');
      fetchStatusCourt(); 
    }else{
      fetchStatusCourt(); 
    }
 
  }, [reloadCourts]));

  useEffect(() => {
    if(timeGame === 0){
    }else{
      setTimeout(() => {  
        CounterTimeGame();          
      }, 60000)    
    }
  })

  return(
  <Container       
    {...rest}
  >
    <CourtContainer>
      <ContainerText>
        <NameCourt
          weight={'BOLD'}
        >
          {name}
        </NameCourt>
        <Icon source={tennisBall}/>
      </ContainerText>
      <CourtImage source={coutImage}/>
      <ContainerText>
        <Icon source={playersImage}/>        
        <PlayersCourt>
          {players.length} jogadore(s)
        </PlayersCourt>
      </ContainerText> 
      <ContainerText>
        <Icon source={timeImage}/>   
        {
          startDateGame ? 
            <NameCourt 
              weight={'REGULAR'}
            >
              {`${startDateGame} até ${endDateGame}`}
            </NameCourt>
          : <Text>00:00</Text>
        }        
      </ContainerText>            
      <Text>{timeGame > 0 ? `Tempo restante ${timeGame && timeGame.toString().padStart(2, '0')}:00`: noGame}</Text>
    </CourtContainer>
    <StatusBar 
      typeStatusBar={statusCourtBar} 
      typeColorCourt={statusBarColorCourt}
      typeStatusGame={statusGameBar}
    />
  </Container>
 )
}
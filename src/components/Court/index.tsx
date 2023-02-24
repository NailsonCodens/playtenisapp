import dayjs from 'dayjs';
import { TouchableOpacityProps, Text, Alert } from 'react-native';
import { RefObject, useCallback, useEffect, useState } from 'react';

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

export function Court ({id, name, reloadCourts, reloadFetchCourts, checkQueue, ...rest }: Props ){ 
  const [gameCurrent, setGameCurrent] = useState<gamePropsDTO>();
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
    const response = await api.get(`/games/game-court-current/${id}`);

    const {game, court} = response.data;

    setGameCurrent(game);

    game && game.players && setPlayers(game.players);

    addColorCourtBarAndStatusCourtBar(game, court);
    mutateDataCourt(game);
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
      setStatusBarColorCourt(colorsCourt.class);
      setStatusGameBar(statusGame.class);
      setStatusCourtBar(statusCourtText.inUse);

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

  function CounterTimeGame(){

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
      }, 60500);
    }
  }

  useFocusEffect(useCallback(() => {
    if(reloadCourts){
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
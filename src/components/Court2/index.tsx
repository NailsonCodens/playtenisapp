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


export type DataObject = {
  id: string,
  date_game: string,
  court_id: string,
  modality_id: string,
  start_time_game: string,
  end_time_game: string,
  time: string
  players: Array<PlayersDTO>,
  modality: {
    id: string,
    name: string,
    amount_players: number, 
    time: string,
    status: string
  }
};

type Props = TouchableOpacityProps & {
  data: DataObject,
  status: string,
  name: string,
  court: courtPropsDTO
}

type PlayersDTO = {
  id: string;
  type: string;
  name: string;
  registration: string;
  status: string;
};

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

export type courtPropsDTO = {
  id: string;
  name: string;
  status: string;
}

export function Court2 ({data, status, name, court, ...rest }: Props ){ 
  const [dataGame, setDataGame] = useState<DataObject>(data);
  const [players, setPlayers] = useState<PlayersDTO[]>([]);
  const [startDateGame, setStartDateGame] = useState<string | null>('');
  const [endDateGame, setEndDateGame] = useState<string | null >('');
  const [timeGame, setTimeGame] = useState<number>(0);
  const [noGame, setNoGame] = useState('Sem jogo');
  const [dateFinishGame, setDateFinishGame] = useState<string>(new Date().toISOString());
  const [statusGameBar, setStatusGameBar] = useState(statusGame.available);
  const [statusBarColorCourt, setStatusBarColorCourt] = useState('');
  const [statusCourtBar, setStatusCourtBar] = useState('');

  function loadInfoGameCourt(){
    if(data.start_time_game){
      setEndDateGame(dayjs(data.end_time_game).locale('pt-br').format('HH:mm'));
      setStartDateGame(dayjs(data.start_time_game).locale('pt-br').format('HH:mm'));
    }

 
    setPlayers(data.players);

    addColorCourtBarAndStatusCourtBar(data, court);
  }

  function addColorCourtBarAndStatusCourtBar(game: DataObject, court: courtPropsDTO){
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

  function CounterTimeGame(){

    const dateNow = dayjs();
    const dateGame = dayjs(dateFinishGame);
    const diffBetweenDate = dateGame.diff(dateNow, 'minute');  

    setTimeGame(diffBetweenDate);
  
    changeStatusGame(diffBetweenDate);
    if(diffBetweenDate === 0){
      setNoGame('Jogo acabando...');

      setTimeout(()=> {
        //setStatusAvailableCourtAfterCounterResets();
        setStartDateGame('');
        setEndDateGame('');
        //reloadFetchCourts();   
        setTimeGame(0); 
        setPlayers([]);
        //checkQueue();
        setNoGame('Sem jogo');
      }, 60500);
    }
  }

  function defineColorBarTextBarAndstatusGame(game: DataObject){
    const coach = game.players.find(player => player.type === 'coach');

    if(game.players.length > 0 && coach){
      setStatusBarColorCourt(colorsCourt.class);
      setStatusGameBar(statusGame.class);
      setStatusCourtBar(statusCourtText.inUse);

    }else{
      setStatusCourtBar(statusCourtText.inUse);
      setStatusBarColorCourt(colorsCourt.inUse); 

      changeStatusGame(Number(game.time));
    }    
  }

  function addDateFinishAndTimeGame(game: DataObject){
    setDateFinishGame(game.end_time_game);
    setTimeGame(Number(game.time));
  }

  useEffect(() => {
    if(timeGame === 0){
    }else{
      setTimeout(() => {
        console.log('estou contanto aqui')
        CounterTimeGame();    
      }, 60000)
    }
  }, [timeGame])

  useEffect(() => {
    loadInfoGameCourt();
  }, [status]);

  return(
  <Container 
    {...rest}
  >
    <CourtContainer>
      <ContainerText>
        <NameCourt
          weight={'BOLD'}
        >
          { name }
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
          : <NameCourt weight={'REGULAR'}>00:00</NameCourt>
        }        
      </ContainerText> 
      <Text>{timeGame > 0 ? `Tempo restante ${timeGame && timeGame.toString().padStart(2, '0')}:00`: noGame}</Text>       
      <Text>{status} {timeGame}</Text>                
    </CourtContainer>
    <StatusBar 
      typeStatusBar={statusCourtBar} 
      typeColorCourt={statusBarColorCourt}
      typeStatusGame={statusGameBar}
    />
  </Container>
 )
}
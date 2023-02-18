
import { useNavigation } from '@react-navigation/native';
import {Header} from '../../components/Header'
import { Container, ContainerScroll, Courts} from './styles';
import { Court } from '../../components/Court';
import { statusGame } from '../../utils/statusGame';
import { Queue } from '../../components/Queue'
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { courtsType } from '../../dtos/courtsDTO';
import { Alert } from 'react-native';

export function Home (){

  const navigatior = useNavigation();
  const [courts, setCourts] = useState<courtsType[]>([]);

  async function handleRegister(courtId: string){
    const response = await api.get(`/games/game-court-current/${courtId}`);

    const {game} = response.data;

    if(game){
      return Alert.alert('Quadras', 'Quadra ocupada. seleciona uma disponível ou entre na fila de espera');
    }

    const { status } = response.data.court;

    if(status === 'off'){
      return Alert.alert('Quadras', 'Esta quadra não está disponível');
    }

    navigatior.navigate('register', {courtId: courtId});
  }

  async function fetchCourts(){
    const response = await api.get('courts');
    setCourts(response.data.list)
  }

  useEffect(() => {
    fetchCourts()
  }, []);

  return(
    <Container>
      <Header/>
      <ContainerScroll>
        <Courts>
          {
            courts.map(court => (
              <Court
                key={court.id}
                id={court.id}
                name={court.name}
                players={'dsadsad'}
                onPress={() => handleRegister(court.id)}
                />
            ))
          }                                      
        </Courts>
        <Queue/>
      </ContainerScroll>
     </Container>
  )
}
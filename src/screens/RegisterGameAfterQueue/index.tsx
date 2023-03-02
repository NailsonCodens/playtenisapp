import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import { Alert, Modal, ScrollView } from 'react-native';
import { AvailableCourt } from '../../components/AvailableCourt';
import { Button } from '../../components/Button';
import { Form } from "../../components/FormElement/Form";
import { GroupInput } from '../../components/FormElement/GroupInput';
import { Label } from '../../components/FormElement/Label';
import { Row } from '../../components/FormElement/Row';
import { TitleInputGroup } from '../../components/FormElement/TitleInputGroup';
import { HeaderRegisterGame } from "../../components/HeaderRegisterGame";
import { Input } from '../../components/InputText';
import { NoneModalitySelected } from '../../components/NoneModalitySelected';
import { ObjectItem, SelectInput } from "../../components/SelectInput";
import { api } from "../../services/api";
import { modalitiesType, modalityType } from "../RegisterGame";
import { Text } from 'react-native';
import { ObjectCourt, RadioButton } from '../../components/RadioButton';
import { ButtonCourtsTypeStyleProps } from '../../components/RadioButton/styles';
import { BodyModal, ContainerModal, ContainerNameCourt, ContainerTime, TextMotivation, Title, TitleModal, Image } from '../RegisterGame/styles';
import { AxiosError } from 'axios';
import { CourtImage } from '../../components/Court/style';
import tenisBall from '../../assets/tennisball.png';
import coutImage from '../../assets/court.png';
import { hasDuplicates } from '../../utils/checkDuplicity';
import socketio from '../../services/socket.io';

type RouteParams = {
  queueId: string,
}

export type ObjectQueue = {
  id: string,
  modality_id: string,
  played: string,
  players: string[]
}

export type typePlayers = {
  id: string, 
  name: string,
  registration: string
}

export type typeCourts = {
  id: string,
};

export type typeDependentsPlayers = {
  player: {
    id: string,
    registration: string,
    name: string,
  }
}

export type newDependentsPlayer = {
  label: string,
  value: string,
};

export interface Error {
  message: string;
  statusCode: number;
}

export function RegisterGameWithQueue(){
  const route = useRoute();
  const navigator = useNavigation();

  const { queueId } = route.params as RouteParams;

  const [queue, setQueue] = useState<ObjectQueue>({
    id: "",
    modality_id: "",
    played: "",
    players: [] 
  });

  const [passTurnToSecondQueueId, setPassTurnToSecondQueueId] = useState('');

  const [courtsAvailable, setCourtsAvailable] = useState<ObjectCourt[]>([]);
  const [nameCourt, setNameCourt] = useState('');
  const [modalities, setModalities] = useState<ObjectItem[]>([]);
  const [modality, setModality] = useState<modalityType>({
    id: "",
    name: "",
    amount_players: "0",
    time: 0,
    status: "",
  });

  const [registrationFirstPlayer, setRegistrationFirstPlayer] = useState<string>("");
  const [idFirstPlayer, setIdFirstPlayer] = useState<string>("");
  const [idFirstOriginalPlayer, setIdFirstOriginalPlayer] = useState<string>("");  
  const [dataFirstPlayer, setDataFirstPlayer] = useState([]);

  const [registrationSecondPlayer, setRegistrationSecondPlayer] = useState<string>("");
  const [idSecondPlayer, setIdSecondPlayer] = useState<string>("");
  const [idSecondOriginalPlayer, setIdSecondOriginalPlayer] = useState<string>("");  
  const [dataSecondPlayer, setDataSecondPlayer] = useState([]);

  const [registrationThirdPlayer, setRegistrationThirdPlayer] = useState<string>("");
  const [idThirdPlayer, setIdThirdPlayer] = useState<string>("");
  const [idThirdOriginalPlayer, setIdThirdOriginalPlayer] = useState<string>("");  
  const [dataThirdPlayer, setDataThirdPlayer] = useState([]);

  const [registrationFourthPlayer, setRegistrationFourthPlayer] = useState<string>("");
  const [idFourthPlayer, setIdFourthPlayer] = useState<string>("");
  const [idFourthOriginalPlayer, setIdFourthOriginalPlayer] = useState<string>("");  
  const [dataFourthPlayer, setDataFourthPlayer] = useState([]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleGame, setModalVisibleGame] = useState(false);
  const [counter, setCounter] = useState(5 * 60);
  const [courtId, setCourtId] = useState('');

  const [modalityChoose, setModalityChoose] = useState<string>('');

  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  async function fetchCountQueues(){
    const response = await api.get(`queue/`);
    if(response.data.length > 1){
      setModalVisible(true);
      response.data.map((queue: ObjectQueue, key: number) => {
        if(key  === 1){
          setPassTurnToSecondQueueId(queue.id);
        }
      });
    }
  }

  async function fetchQueue(){
    const response = await api.get(`queue/${queueId}`);
    setQueue(response.data);


  setModalityChoose(response.data.modality_id);


    response.data.players.map((player: typePlayers, key: number) => {
      if(key === 0){
        setRegistrationFirstPlayer(`${player.registration} - ${player.name}`);
        setIdFirstOriginalPlayer(player.id);
        setIdFirstPlayer(player.id);
      }

      if(key === 1){
        setRegistrationSecondPlayer(`${player.registration} - ${player.name}`);
        setIdSecondOriginalPlayer(player.id);
        setIdSecondPlayer(player.id);
      }

        if(key === 2){
          setRegistrationThirdPlayer(`${player.registration} - ${player.name}`);
          setIdThirdOriginalPlayer(player.id);
          setIdThirdPlayer(player.id);  
        }
  
        if(key === 3){
          setRegistrationFourthPlayer(`${player.registration} - ${player.name}`);
          setIdFourthOriginalPlayer(player.id);
          setIdFourthPlayer(player.id);  
        }  
    });
  }

  async function fetchCourts(){

    const response = await api.get(`courts/`);

    const courts = await Promise.all(
      response.data.list.map(async (court: typeCourts) => {
    
        const gameAlredy = await api.get(`/games/game-court-current/${court.id}`);
    
        let haveGame = '';        
    
        if(!gameAlredy.data.game){
          haveGame = 'no';
        }

        return {
          ...court,
          game: haveGame
        }  
      })  
    );

    setCourtsAvailable(courts);
  }

  async function fetchModalities(){
    const response = await api.get(`/modalities/`);

    const newModalities = response.data.map((modalities: modalitiesType) => {
      return {
        label: modalities.name,
        value: modalities.id,
      };
    });

    setModalities(newModalities);
  }
  
  async function fetchAmountPlayers(id: object){
    const modalitId = String(id);

    setModalityChoose(String(id));

    if(modalitId !== ""){
      const response = await api.get(`/modalities/${id}`);
      setModality(response.data);
    }
  }  

  async function handleRegistrationPlayer(player: string){

    const howsPLayer = player;
    let registration = '';

    if(howsPLayer === 'first'){
      registration = registrationFirstPlayer;
    }

    if(howsPLayer === "second"){
      registration = registrationSecondPlayer;
    }

    if(howsPLayer === "third"){
      registration = registrationThirdPlayer;
    }    

    if(howsPLayer === "fourth"){
      registration = registrationFourthPlayer;
    }        

    fetchDataPlayers(registration, howsPLayer);
  }

  async function fetchDataPlayers(registration: string, howsplayer: string){
    if(registration){

      if(registration.split(' - ')[0]){
        registration = registration.split(' - ')[0].trim();
      }
      
      try {
        const response = await api.get(`/members/${registration}`);

        if(response.data){
          const {id} = response.data;
          const responseDependents = await api.get(`/dependents/${id}`);
    
          if(howsplayer === 'first'){
            setIdFirstOriginalPlayer(response.data.id);
            setIdFirstPlayer(response.data.id);
            setDataFirstPlayer(responseDependents.data.dependents);  
            setRegistrationFirstPlayer(`${registration} - ${response.data.name}`);
          }
    
          if(howsplayer === "second"){
            setIdSecondOriginalPlayer(response.data.id);          
            setIdSecondPlayer(response.data.id);
            setDataSecondPlayer(responseDependents.data.dependents); 
            setRegistrationSecondPlayer(`${registration} - ${response.data.name}`);
          }
  
          if(howsplayer === "third"){
            setIdThirdOriginalPlayer(response.data.id);          
            setIdThirdPlayer(response.data.id);
            setDataThirdPlayer(responseDependents.data.dependents); 
            setRegistrationThirdPlayer(`${registration} - ${response.data.name}`);
          } 
          
          if(howsplayer === "fourth"){
            setIdFourthOriginalPlayer(response.data.id);          
            setIdFourthPlayer(response.data.id);
            setDataFourthPlayer(responseDependents.data.dependents); 
            setRegistrationFourthPlayer(`${registration} - ${response.data.name}`);
          }         
        }          
      } catch (err) {
        const error = err as AxiosError<Error>;
        Alert.alert('Matrícula jogador', error.response?.data.message);
        
        if(howsplayer === 'first'){
          setRegistrationFirstPlayer('');
          setDataFirstPlayer([]);
        }
  
        if(howsplayer === "second"){
          setRegistrationSecondPlayer('');
          setDataSecondPlayer([]);
        }

        if(howsplayer === "third"){
          setRegistrationThirdPlayer('');
          setDataThirdPlayer([]);
        } 
        
        if(howsplayer === "fourth"){
          setRegistrationFourthPlayer('');
          setDataFourthPlayer([]);
        }    
      }  
    }
  }

  function showDependentsPlayer(howsplayer: string){
    let dataPlayer: string[] = [];

    if(howsplayer === 'first'){
      dataPlayer = dataFirstPlayer;
    }

    if(howsplayer === "second"){
      dataPlayer = dataSecondPlayer;
    }    

    if(howsplayer === "third"){
      dataPlayer = dataThirdPlayer;
    }        

    if(howsplayer === "fourth"){
      dataPlayer = dataFourthPlayer;
    }         
    return showDependentsPlayers(dataPlayer, howsplayer);
  }

  function selectDependentPlayer(value: string, howsplayer: string){
    if(howsplayer === 'first'){
      if(value !== ""){
        setIdFirstPlayer(value);
      }else{
        setIdFirstPlayer(idFirstOriginalPlayer);
      }
    }

    if(howsplayer === "second"){
      if(value !== ""){
        setIdSecondPlayer(value);
      }else{
        setIdSecondPlayer(idSecondOriginalPlayer);
      }
    }    

    if(howsplayer === "third"){
      if(value !== ""){
        setIdThirdPlayer(value);
      }else{
        setIdThirdPlayer(idThirdOriginalPlayer);
      }
    }

    if(howsplayer === "fourth"){
      if(value !== ""){
        setIdFourthPlayer(value);
      }else{
        setIdFourthPlayer(idFourthOriginalPlayer);
      }
    }    
  }

  function showDependentsPlayers(dataPlayer: string[], howsplayer: string){

    if(dataPlayer.length > 0){
      const newDependentsPlayer: newDependentsPlayer[] = dataPlayer.map((dependentsDataPlayer) => {
        const  objectDependents: typeDependentsPlayers = Object(dependentsDataPlayer);

        return {
          label: `${objectDependents.player.registration} ${objectDependents.player.name}`,
          value: `${objectDependents.player.id}`,
        };
      });
    
    
      let value = '';

      if(howsplayer === 'first'){
        value = idFirstPlayer;
      }

      if(howsplayer === 'second'){
        value = idSecondPlayer;
      }

      if(howsplayer === 'third'){
        value = idThirdPlayer;
      }
      
      if(howsplayer === 'fourth'){
        value = idFourthPlayer;
      }

      return (
        <>
          <Label label="Você tem dependentes, escolha quem vai jogar!" textColor={true}/>
          <SelectInput 
            value={value}
            placeholder={{ label: 'Eu mesmo vou jogar', value: ''}}
            fetch={(value) => {selectDependentPlayer(String(value), howsplayer)}}
            items={newDependentsPlayer}
          />
        </>
      );  
    }    
  }

  function renderInicialInputs(){
    return (
      <>
        <TitleInputGroup label="Dupla 1°"/>
        <Row>
          <GroupInput>
            <Label label="Matrícula do 1° jogador"  textColor={false}/>
            <Input 
              value={registrationFirstPlayer}
              onEndEditing={() => handleRegistrationPlayer('first')}
              onChangeText={setRegistrationFirstPlayer}
              returnKeyType="done"
              keyboardAppearance="light"
              keyboardType="numeric"
            />
          </GroupInput>
          <GroupInput>
            <Label label="Matrícula do 2° jogador" textColor={false}/>
            <Input
              value={registrationSecondPlayer}
              onEndEditing={() => handleRegistrationPlayer('second')}
              onChangeText={setRegistrationSecondPlayer}
              returnKeyType="done"
              keyboardAppearance="light"
              keyboardType="numeric"                        
            />
          </GroupInput>          
        </Row>
        <Row>
          <GroupInput>
            <>
              {
                showDependentsPlayer('first')
              }        
            </>
          </GroupInput>
          <GroupInput>
            <>
              {
                showDependentsPlayer('second')
              }          
            </>
          </GroupInput>
        </Row>                  
      </>      
    )
  }

  function renderFinalInputsWhenCourtisForPlayers(){
    return(
      <>
        <TitleInputGroup label="Dupla 2°"/>
        <Row>
          <GroupInput>
            <Label label="Matrícula do 3° jogador" textColor={false}/>

            <Input 
              value={registrationThirdPlayer}
              onEndEditing={() => handleRegistrationPlayer('third')}
              onChangeText={setRegistrationThirdPlayer}
              returnKeyType="done"
              keyboardAppearance="light"
              keyboardType="numeric"
            />
          </GroupInput>
          <GroupInput>
            <Label label="Matrícula do 4° jogador" textColor={false}/>
            <Input
              value={registrationFourthPlayer}
              onEndEditing={() => handleRegistrationPlayer('fourth')}
              onChangeText={setRegistrationFourthPlayer}
              returnKeyType="done"
              keyboardAppearance="light"
              keyboardType="numeric"                        
            />
          </GroupInput>
        </Row>
        <Row>
            <GroupInput>
              <>
                {
                  showDependentsPlayer('third')
                }
              </>
            </GroupInput>          
            <GroupInput>
              <>
                {
                  showDependentsPlayer('fourth')
                }                    
              </>
            </GroupInput>          
        </Row>
      </>
    );
  } 
  
  function handleSetChooseIdCort(id: string, name: string){
    setCourtId(id);
    setNameCourt(name);
  }

  function renderAvailableCourts(){
    return(
      <RadioButton 
        handleSetCourt={(id: string, name: string) => handleSetChooseIdCort(id, name)}
        data={courtsAvailable}
      />
    );
  }

  function handleKeepGoinGameAfterQueue(){
    setModalVisible(false);
  }

  async function handlePassTurn(){    
    const response = await api.get(`queue/${passTurnToSecondQueueId}`);
    setQueue(response.data);

    response.data.players.map((player: typePlayers, key: number) => {
      if(key === 0){
        setRegistrationFirstPlayer(`${player.registration} - ${player.name}`);
        setIdFirstOriginalPlayer(player.id);
        setIdFirstPlayer(player.id);
      }

      if(key === 1){
        setRegistrationSecondPlayer(`${player.registration} - ${player.name}`);
        setIdSecondOriginalPlayer(player.id);
        setIdSecondPlayer(player.id);
      }

        if(key === 2){
          setRegistrationThirdPlayer(`${player.registration} - ${player.name}`);
          setIdThirdOriginalPlayer(player.id);
          setIdThirdPlayer(player.id);  
        }
  
        if(key === 3){
          setRegistrationFourthPlayer(`${player.registration} - ${player.name}`);
          setIdFourthOriginalPlayer(player.id);
          setIdFourthPlayer(player.id);  
        }  
    }); 

    setModalVisible(false);
  }

  async function handleSaveGameAfterQueue(){
    if(!courtId){
      return Alert.alert('Cadastrode jogo', 'Selecione uma quadra entre as disponíveis para iniciar o jogo')
    }

    const playersId: string[] = []; 

    if(idFirstPlayer !== undefined && idFirstPlayer !== ""){
      playersId.push(idFirstPlayer);
    }

    if(idSecondPlayer !== undefined && idSecondPlayer !== ""){
      playersId.push(idSecondPlayer);
    }

    if(idThirdPlayer !== undefined && idThirdPlayer !== ""){
      playersId.push(idThirdPlayer);
    }

    if(idFourthPlayer !== undefined && idFourthPlayer !== ""){
      playersId.push(idFourthPlayer);
    }

    if(playersId.length === 0){
      return Alert.alert('Cadastro de jogo', 'Informe a matrícula dos jogadores');
    }

    const checkDuplicity = hasDuplicates(playersId);

    if(checkDuplicity){
      return Alert.alert('Cadastro de jogo', 'Você está tentando por um jogador repetido em 2 campos. Revise por favor');  
    }

    try {
        const response = await api.post(`/games/`, {
          court_id: courtId,
          modality_id: modality.id,
          players: playersId          
        });      
        setModalVisibleGame(true);

        await api.put(`queue/is-played/${queue.id}`);

        setTimeout(() => {
          setModalVisibleGame(false);
          navigator.navigate('home');
        }, 5000);


        hideModalWebOnSocket();

    } catch (err) {   
      const error = err as AxiosError<Error>;
      console.log('ta batendo aqui');
      Alert.alert('Cadastro de jogo', error.response?.data.message);
    }
  }

  function hideModalWebOnSocket(){
    socketio.emit("hideModalWeb", 'sadsadsad');

    socketio.off('hideModalWeb')
    socketio.off('responseHideModalWeb')      
  }

  useEffect(() => {
    fetchQueue();    
    fetchCountQueues();
  }, []);

  useEffect(() => {
    fetchModalities();    
  }, []);

  useEffect(() => {
    fetchCourts();    
  }, []);

  useEffect(() => {
    if(modalVisibleGame){
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);  
    }
  });  

  return (
   <>
    <Form>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible} 
        supportedOrientations={['landscape']} 
      >
        <ContainerModal>
          <BodyModal>
            <TitleModal>Olá, chegou sua hora de jogar.</TitleModal>
            <TextMotivation>continuar para jogar ou passar a vez para o próximo da fila.</TextMotivation>
            <Row>
              <Button 
                title={'Passar a vez'}
                redButton={true}                
                onPress={() => handlePassTurn()}
              />            
              <Button 
                title={'Continuar para jogar'}
                onPress={() => handleKeepGoinGameAfterQueue()}
              />
            </Row>
          </BodyModal>            
        </ContainerModal>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleGame} 
        supportedOrientations={['landscape']} 
      >
        <ContainerModal>
          <BodyModal>
            <TitleModal>Jogo cadastrado com sucesso!</TitleModal>
            <ContainerNameCourt>
              <Title>{nameCourt}</Title>
              <Image source={tenisBall}/>              
            </ContainerNameCourt>
            <CourtImage source={coutImage}/>
            <TextMotivation>Seu jogo vai começar em 5 minutos, se prepare e dê o seu melhor!</TextMotivation>
            <ContainerTime>{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</ContainerTime>
          </BodyModal>            
        </ContainerModal>
      </Modal>             
      <HeaderRegisterGame 
        title="Cadastro de jogo"
      />  
      <Row>
        <GroupInput>
          <Label label="Selecione a quadra" textColor={false} />
          <ScrollView
            horizontal={true}
          >
            {
              renderAvailableCourts()
            }
          </ScrollView>
        </GroupInput>
        <GroupInput>
          <Label label="Modalidade" textColor={false}/>
          <SelectInput
            value={modalityChoose}
            placeholder={{ label: 'Selecione a modalidade', value: '' }} 
            fetch={(id) => {fetchAmountPlayers(id)}}
            items={modalities}
          />
        </GroupInput>
      </Row>      
      {
        modality.amount_players === '0' ?
        (
          <>
            <NoneModalitySelected message=""/>
          </>
        ):
        (
          <>
            {
              modality.amount_players === '2' ?
              (
                <>
                  {
                    renderInicialInputs()                    
                  }
                </>
              ):
              (
                <>
                  {
                    renderInicialInputs()                    
                  }
                  {
                    renderFinalInputsWhenCourtisForPlayers()                    
                  }
                </>
              )
            }  
            <Row>
              <GroupInput>
                <Button 
                  title={'Play'}
                  onPress={() => handleSaveGameAfterQueue()}
                />
              </GroupInput>
            </Row>    
          </>            
        )
      }        
    </Form>
   </>
  ) 
 }
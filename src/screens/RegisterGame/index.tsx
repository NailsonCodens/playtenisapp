import { BodyModal, Container, ContainerModal, ContainerNameCourt, ContainerTime, CourtImage, Image, TextMotivation, Title, TitleModal } from "./styles";
import { HeaderRegisterGame} from "../../components/HeaderRegisterGame";
import { ObjectItem, SelectInput } from "../../components/SelectInput";
import { Form } from '../../components/FormElement/Form';
import { Row } from "../../components/FormElement/Row";
import { GroupInput } from "../../components/FormElement/GroupInput";
import { Label } from "../../components/FormElement/Label";
import { AvailableCourt } from '../../components/AvailableCourt';
import { Input } from "../../components/InputText";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {NoneModalitySelected} from "../../components/NoneModalitySelected";
import RNPickerSelect from 'react-native-picker-select';

import { api } from "../../services/api";
import { Alert, Modal, Text } from 'react-native';
import { TitleInputGroup } from '../../components/FormElement/TitleInputGroup/index';
import tenisBall from '../../assets/tennisball.png';
import coutImage from '../../assets/court.png';
import { typeDependentsPlayers } from "../RegisterGameAfterQueue";
import { AxiosError } from "axios";
import theme from '../../theme';
import { hasDuplicates } from "../../utils/checkDuplicity";

const pickerStyle = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: theme.BORDER_RADIUS,
    color: 'black',
    width: '100%', 
    height: 52,
    fontFamily: "Poppins_700Bold"    
  },
  placeholder: {
    color: '#000',
    fontSize: 16
  },  
	inputAndroid: {
    width: '100%', 
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: theme.BORDER_RADIUS,
    color: 'black',
    height: 52,
    fontFamily: "Poppins_700Bold" 
	},
};


type RouteParams = {
  courtName: string,
  courtId: string,
}

export type modalitiesType = {
  name: string,
  id: string,
}

export type modalityType = {
	id: string,
	name: string,
	amount_players: string,
	time: number,
	status: string;  
}

export function RegisterGame(){
  const route = useRoute();
  const navigator = useNavigation();
  
  const {courtName, courtId} = route.params as RouteParams;
  const [modalities, setModalities] = useState<ObjectItem[]>([]);
  const [modality, setModality] = useState<modalityType>({
    id: "",
    name: "",
    amount_players: "0",
    time: 0,
    status: "",
  });
  const [nameCourt, setNameCourt] = useState<string>(courtName);
  const [idCourt, setIdCourt] = useState<string>(courtId);
  const [idGame, setIdGame] = useState<string>("");

  const [registrationFirstPlayer, setRegistrationFirstPlayer] = useState<string>("");
  const [idFirstPlayer, setIdFirstPlayer] = useState<string>("");
  const [idFirstOriginalPlayer, setIdFirstOriginalPlayer] = useState<string>("");  
  const [dataFirstPlayer, setDataFirstPlayer] = useState<string[]>([]);

  const [registrationSecondPlayer, setRegistrationSecondPlayer] = useState<string>("");
  const [idSecondPlayer, setIdSecondPlayer] = useState<string>("");
  const [idSecondOriginalPlayer, setIdSecondOriginalPlayer] = useState<string>("");  
  const [dataSecondPlayer, setDataSecondPlayer] = useState<string[]>([]);

  const [registrationThirdPlayer, setRegistrationThirdPlayer] = useState<string>("");
  const [idThirdPlayer, setIdThirdPlayer] = useState<string>("");
  const [idThirdOriginalPlayer, setIdThirdOriginalPlayer] = useState<string>("");  
  const [dataThirdPlayer, setDataThirdPlayer] = useState<string[]>([]);

  const [registrationFourthPlayer, setRegistrationFourthPlayer] = useState<string>("");
  const [idFourthPlayer, setIdFourthPlayer] = useState<string>("");
  const [idFourthOriginalPlayer, setIdFourthOriginalPlayer] = useState<string>("");  
  const [dataFourthPlayer, setDataFourthPlayer] = useState<string[]>([]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [counter, setCounter] = useState(10 * 60);

  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

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
    console.log('asdasd');

    const modalitId = String(id);
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
        console.log(value);
      }else{
        console.log(idFourthOriginalPlayer);
        setIdFourthPlayer(idFourthOriginalPlayer);
      }
    }    
  }

  function showDependentsPlayers(dataPlayer: string[], howsplayer: string){
    if(dataPlayer.length > 0){
      const newDependentsPlayer = dataPlayer.map((dependentsDataPlayer) => {
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
          <Label label="Escolha se você ou algum deles é quem vai jogar?" textColor={true}/>
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

  async function handleSaveGameAndPlayers(){
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

    const checkDuplicity = hasDuplicates(playersId);

    if(checkDuplicity){
      Alert.alert('Cadastro de jogo', 'Você está tentando por um jogador repetido em 2 campos. Revise por favor');  
    }

    if(playersId.length === 0){
      return Alert.alert('Cadastro de jogo', 'Adicione alguns jogadores para criar um jogo');
    }

    try {
        const response = await api.post(`/games/`, {
          court_id: idCourt,
          modality_id: modality.id,
          players: playersId          
        });      
        setModalVisible(true);

        setTimeout(() => {
          setIdGame('');
          setModalVisible(false);
          navigator.navigate('home');
        }, 3000);
    } catch (err) {   
      const error = err as AxiosError<Error>;

      Alert.alert('Cadastro de jogo', error.response?.data.message);
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



  useEffect(() => {
    fetchModalities();
  }, []);

  useEffect(() => {
    if(modalVisible){
      setTimeout(() => {
        setCounter(counter - 1);
      }, 3000);  
    }
  });

  return(
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible} 
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
            <TextMotivation>Seu jogo vai começar em 10 minutos, se prepare e dê o seu melhor!</TextMotivation>
            <ContainerTime>{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</ContainerTime>
          </BodyModal>            
        </ContainerModal>
      </Modal>      
      <Form>
      <HeaderRegisterGame 
        title="Cadastro de jogo"
      />        
        <Row>
          <GroupInput>
            <Label label="Quadra Selecionada" textColor={false} />
            <AvailableCourt court={nameCourt}/>
          </GroupInput>
          <GroupInput>
            <Label label="Modalidade" textColor={false}/>
            <SelectInput 
              value={modality.id}
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
              <NoneModalitySelected message="Selecione a modalidade para inicia o cadastro"/>
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
 
            </>            
          )
        }  
        <Row>
          <GroupInput>
            <Button 
              title={'Play'}
              onPress={() => handleSaveGameAndPlayers()}
            />
          </GroupInput>
        </Row>                          
      </Form>
    </Container>
  )
}
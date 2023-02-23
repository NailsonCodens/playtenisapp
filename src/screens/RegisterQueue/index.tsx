import { useNavigation, useRoute } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Modal } from 'react-native';
import { AvailableCourt } from '../../components/AvailableCourt';
import { Button } from '../../components/Button';
import { Form } from '../../components/FormElement/Form';
import { GroupInput } from '../../components/FormElement/GroupInput';
import { Label } from '../../components/FormElement/Label';
import { Row } from '../../components/FormElement/Row';
import { TitleInputGroup } from '../../components/FormElement/TitleInputGroup';
import { HeaderRegisterGame } from '../../components/HeaderRegisterGame';
import { Input } from '../../components/InputText';
import { NoneModalitySelected } from '../../components/NoneModalitySelected';
import { ObjectItem, SelectInput } from '../../components/SelectInput';
import { api } from '../../services/api';
import { modalitiesType } from '../RegisterGame';
import { BodyModal, ContainerModal, ContainerNameCourt, ContainerTime, CourtImage, TextMotivation, Title, TitleModal } from '../RegisterGame/styles';
import { typeDependentsPlayers } from '../RegisterGameAfterQueue';
import {Container, SubTitle} from './styles';

export type modalityTypeQueue = {
	id: string,
	name: string,
	amount_players: string,
	time: number,
	status: string;  
}

export function RegisterQueue(){
  const route = useRoute();
  const navigator = useNavigation();
    
  const [modalities, setModalities] = useState<ObjectItem[]>([]);
  const [modality, setModality] = useState<modalityTypeQueue>({
    id: "",
    name: "",
    amount_players: "0",
    time: 0,
    status: "",
  });

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

  async function handleSaveQueueAndPlayers(){
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
      return Alert.alert('Fila de espera', 'Adicione alguns jogadores para esperar a próxima quadra livre');
    }


    try {
        await api.post(`/queue/`, {
          modality_id: modality.id,
          players: playersId          
        });      
        setModalVisible(true);

        setTimeout(() => {
          setModalVisible(false);
          navigator.navigate('home');
        }, 10000);
    } catch (err) {   
      const error = err as AxiosError<Error>;      
      Alert.alert('Fila de espera', error.response?.data.message);
    }    
  }

  async function fetchAmountPlayers(id: object){
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
    
      return (
        <>
          <Label label="Escolha se você ou algum deles é quem vai jogar?" textColor={true}/>
          <SelectInput 
            value=''
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

  useEffect(() => {
    fetchModalities();
  }, []);  

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
            <TitleModal>Pronto. Seu jogo está na fila de espera!</TitleModal>
            <ContainerNameCourt>
            </ContainerNameCourt>
            <TextMotivation>Você será avisando quando alguma quadra estiver disponível</TextMotivation>
          </BodyModal>            
        </ContainerModal>
      </Modal>  
      <Form>
        <HeaderRegisterGame 
          title="Entrar na fila de espera"
        />
        <SubTitle>No momento todas as quadras estão ocupadas. Você está entrando na fila de espera.</SubTitle>        
        <Row>
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
              <NoneModalitySelected message="Selecione a modalidade para iniciar"/>
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
                    title={'Entrar na fila de espera'}
                    onPress={() => handleSaveQueueAndPlayers()}
                  />
                </GroupInput>
              </Row>    
            </>            
          )
        }                     
      </Form>      
    </Container>
  )
}
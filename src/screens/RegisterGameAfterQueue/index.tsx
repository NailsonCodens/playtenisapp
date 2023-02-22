import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
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

type RouteParams = {
  queueId: string,
}

type ObjectQueue = {
  id: string,
  modality_id: string,
  played: string,
  players: string[]
}

export function RegisterGameWithQueue(){
  const route = useRoute();
  const { queueId } = route.params as RouteParams;

  const [queue, setQueue] = useState<ObjectQueue>({});
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

  async function fetchQueue(){
    const response = await api.get(`queue/${queueId}`);
    setQueue(response.data)
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

    console.log(id);

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
      } catch (error) {
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

  function selectDependentPlayer(value, howsplayer: string){
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

  function showDependentsPlayers(dataPlayer, howsplayer: string){
    if(dataPlayer.length > 0){
      const newDependentsPlayer = dataPlayer.map((dependentsDataPlayer) => {
        return {
          label: `${dependentsDataPlayer.player.registration} ${dependentsDataPlayer.player.name}`,
          value: `${dependentsDataPlayer.player.id}`,
        };
      });
    
      return (
        <>
          <Label label="Escolha se você ou algum deles é quem vai jogar?" textColor={true}/>
          <SelectInput 
            value=''
            placeholder={{ label: 'Eu mesmo vou jogar', value: ''}}
            fetch={(value) => {selectDependentPlayer(value, howsplayer)}}
            items={newDependentsPlayer}
          />
        </>
      );  
    }    
  }

  function handleSaveGameAfterQueue(){
    console.log('-');
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
    fetchQueue();    
  }, []);

  useEffect(() => {
    fetchModalities();    
  }, []);

  return (
   <>
    <Form>
      <HeaderRegisterGame 
        title="Cadastro de jogo"
      />  
      <Row>
        <GroupInput>
          <Label label="Selecione a quadra" textColor={false} />
        </GroupInput>
        <GroupInput>
          <Label label="Modalidade" textColor={false}/>
          <SelectInput
            value={queue.modality_id}
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
            <NoneModalitySelected message="Selecione uma quadra para inicia o cadastro"/>
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
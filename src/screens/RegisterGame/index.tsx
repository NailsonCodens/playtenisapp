import { Container } from "./styles";
import { HeaderRegisterGame} from "../../components/HeaderRegisterGame";
import { ObjectItem, SelectInput } from "../../components/SelectInput";
import { Form } from '../../components/FormElement/Form';
import { Row } from "../../components/FormElement/Row";
import { GroupInput } from "../../components/FormElement/GroupInput";
import { Label } from "../../components/FormElement/Label";
import { AvailableCourt } from '../../components/AvailableCourt';
import { Input } from "../../components/InputText";
import { Button } from "../../components/Button";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {NoneModalitySelected} from "../../components/NoneModalitySelected";

import { api } from "../../services/api";
import { Alert, Text } from 'react-native';
import { TitleInputGroup } from '../../components/FormElement/TitleInputGroup/index';

type RouteParams = {
  courtName: string,
  courtId: string,
}

type modalitiesType = {
  name: string,
  id: string,
}

type modalityType = {
	id: string,
	name: string,
	amount_players: string,
	time: number,
	status: string;  
}

export function RegisterGame(){
  const route = useRoute();
  const {courtName, courtId} = route.params as RouteParams;
console.log(courtName, courtId);
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
        Alert.alert('Associado', error.response?.data.message);
        
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
          <Row>
            <GroupInput>
              <Label label="Você tem dependentes. Escolha se você ou algum deles é quem vai jogar?"/>
              <SelectInput 
                placeholder={{ label: 'Eu mesmo vou jogar', value: ''}}
                fetch={(value) => {selectDependentPlayer(value, howsplayer)}}
                items={newDependentsPlayer}
              />
            
            </GroupInput>
          </Row>      
        </>
      );  
    }    
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

    if(playersId.length === 0){
      return Alert.alert('Cadastro de jogo', 'Adicione alguns jogadores para criar um jogo');
    }

    console.log(idCourt);
    console.log(modality.id);
    console.log(playersId);

    try {
      if(idGame == ""){
        const response = await api.post(`/games/`, {
          court_id: idCourt,
          modality_id: modality.id
        });      
        setIdGame(response.data.id);
      }

      await api.post(`/games/players/`, {
        game_id: idGame,
        players: playersId
      });

      //colocar aqui o setGame como vazio pois o processo de cadastro acabou;
      //abrir modal e avisar que o jogo vai comerçar em 9 minutis
      //fazer voltar a home dpsde alguns segundos e atualizar a rota das quadras usando usestatenavigator e
    } catch (error) {
      Alert.alert('Cadastro de jogo', error.response?.data.message);
    }
  }

  function renderInicialInputs(){
    return (
      <>
        <TitleInputGroup label="Dupla 1°"/>
        <Row>
          <GroupInput>
            <Label label="Matrícula do 1° jogador"/>

            <Input 
              value={registrationFirstPlayer}
              onEndEditing={() => handleRegistrationPlayer('first')}
              onChangeText={setRegistrationFirstPlayer}
              returnKeyType="done"
              keyboardAppearance="light"
              keyboardType="numeric"
            />
          </GroupInput>
        </Row>
        {
          showDependentsPlayer('first')
        }
        <Row>
          <GroupInput>
            <Label label="Matrícula do 2° jogador"/>
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
        {
          showDependentsPlayer('second')
        }                    
      </>      
    )
  }

  function renderFinalInputsWhenCourtisForPlayers(){
    return(
      <>
        <TitleInputGroup label="Dupla 2°"/>
        <Row>
          <GroupInput>
            <Label label="Matrícula do 3° jogador"/>

            <Input 
              value={registrationThirdPlayer}
              onEndEditing={() => handleRegistrationPlayer('third')}
              onChangeText={setRegistrationThirdPlayer}
              returnKeyType="done"
              keyboardAppearance="light"
              keyboardType="numeric"
            />
          </GroupInput>
        </Row>
        {
          showDependentsPlayer('third')
        }
        <Row>
          <GroupInput>
            <Label label="Matrícula do 4° jogador"/>
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
        {
          showDependentsPlayer('fourth')
        }                    
      </>
    );
  }

  useEffect(() => {
    fetchModalities();
  }, []);

  return(
    <Container>
      <Form>
      <HeaderRegisterGame 
        title="Cadastro de jogo"
      />        
        <Row>
          <GroupInput>
            <Label label="Quadra Selecionada"/>
            <AvailableCourt court={nameCourt}/>
          </GroupInput>
          <GroupInput>
            <Label label="Modalidade"/>
            <SelectInput 
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
                    title="Play"
                    onPress={() => handleSaveGameAndPlayers()}
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
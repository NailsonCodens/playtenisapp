import {View, Text} from "react-native"
import { Container, CourtContainer, NameCourt } from './style';
import { StatusBar } from "../Statusbar";

type Props = {
  name: string,
  statusCourt: string,
  colorCourt: string,
  statusGame: {
    text: string,
    color: string
  }
}

export function Court ({name, statusCourt, colorCourt, statusGame }: Props ){
 return(
  <Container>
    <CourtContainer>
      <NameCourt>{name}</NameCourt>
    </CourtContainer>
    <StatusBar 
      typeStatusBar={statusCourt} 
      typeColorCourt={colorCourt}
      typeStatusGame={statusGame}
      />
  </Container>
 )
}
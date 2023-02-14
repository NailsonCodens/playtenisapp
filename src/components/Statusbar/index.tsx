import { View, Text } from "react-native";
import { styles, ContainerStatusBar, TextStatusbar, StatusGame, TextGame } from './style';

type Props = {
  typeStatusBar: string,
  typeColorCourt: string,
  typeStatusGame: {
    text: string,
    color: string,
  }
}

export function StatusBar({typeStatusBar, typeColorCourt, typeStatusGame}: Props){
  return(
    <ContainerStatusBar style={{backgroundColor: typeColorCourt}}>
      <TextStatusbar>{typeStatusBar}</TextStatusbar>
      <StatusGame style={{backgroundColor: typeStatusGame.color,}}>
        <TextGame style={styles.textGame}>{typeStatusGame.text}</TextGame>
      </StatusGame>      
    </ContainerStatusBar>
  )
}
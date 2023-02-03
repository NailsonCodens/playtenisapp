import {View, Text} from "react-native"
import { styles } from './style';
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
  <View style={styles.containerCourt}>
    <View style={styles.court}>
      <Text>{name}</Text>
    </View>
    <StatusBar 
      typeStatusBar={statusCourt} 
      typeColorCourt={colorCourt}
      typeStatusGame={statusGame}
      />
  </View>
 )
}
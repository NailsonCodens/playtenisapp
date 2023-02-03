import { View, Text } from "react-native";
import { styles } from './style';

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
    <View style={[styles.statusbar, {backgroundColor: typeColorCourt,}]}
    >
      <Text style={styles.statusBar}>{typeStatusBar}</Text>
      <View style={[
        styles.statusGame, 
        {backgroundColor: typeStatusGame.color,}
      ]}>
        <Text style={styles.textGame}>{typeStatusGame.text}</Text>
      </View>      
    </View>
  )
}
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from './style';

export function Queue(){
  return(
    <View style={styles.containerQueue}>
      <View style={styles.queue}>
        <Text style={styles.textQueue}>Fila de espera</Text>        
      </View>
      <TouchableOpacity style={styles.JoinQueue}>
        <Text style={styles.textButton}>Entrar na fila de espera</Text>
      </TouchableOpacity>
    </View>

  )
}
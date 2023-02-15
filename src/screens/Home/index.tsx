
import { View, Text, ScrollView } from 'react-native';
import {Header} from '../../components/Header'
import { styles } from './styles';
import { Court } from '../../components/Court';
import { statusCourt } from '../../utils/statusCourt';
import { colorsCourt } from '../../utils/colorsCourt';
import { statusGame } from '../../utils/statusGame';
import { Queue } from '../../components/Queue';

export function Home (){
  return(
    <View style={styles.home}>
      <Header/>
      <ScrollView style={styles.containerFull}>
        <View style={styles.containerCourts}>
          <Court name="Quadra 1" 
            statusCourt={statusCourt.available} 
            colorCourt={colorsCourt.available}
            statusGame={statusGame.available}
          />        
          <Court name="Quadra 2" 
            statusCourt={statusCourt.inUse} 
            colorCourt={colorsCourt.inUse}
            statusGame={statusGame.start}
          /> 
          <Court name="Quadra 3" 
            statusCourt={statusCourt.unavailable} 
            colorCourt={colorsCourt.unavailable}
            statusGame={statusGame.unavailable}
          />    
          <Court name="Quadra 4" 
            statusCourt={statusCourt.available} 
            colorCourt={colorsCourt.available}
            statusGame={statusGame.available}
          /> 
          <Court name="Quadra 5" 
            statusCourt={statusCourt.available} 
            colorCourt={colorsCourt.available}
            statusGame={statusGame.available}
          />        
          <Court name="Quadra 6" 
            statusCourt={statusCourt.available} 
            colorCourt={colorsCourt.available}
            statusGame={statusGame.available}
          />     
          <Court name="Quadra 7" 
            statusCourt={statusCourt.inUse} 
            colorCourt={colorsCourt.inUse}
            statusGame={statusGame.start}
          />  
          <Court name="Quadra 8" 
            statusCourt={statusCourt.unavailable} 
            colorCourt={colorsCourt.unavailable}
            statusGame={statusGame.unavailable}          
          />                                    
        </View>
        <Queue/>
      </ScrollView>
     </View>
  )
}
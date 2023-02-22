import {createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { RegisterGame } from '../screens/RegisterGame';
import { RegisterGameWithQueue } from '../screens/RegisterGameAfterQueue';
import { RegisterQueue } from '../screens/RegisterQueue/index';

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes(){
  return(
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="home" component={Home} />
      <Screen name="register" component={RegisterGame} />
      <Screen name="queue" component={RegisterQueue} />
      <Screen name="gamequeue" component={RegisterGameWithQueue} />      
    </Navigator>
  )
}
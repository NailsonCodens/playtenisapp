import { StatusBar, View } from 'react-native';

import * as ScreenOrientation from 'expo-screen-orientation';
import { Home } from './src/screens/Home/index';
import {useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold} from '@expo-google-fonts/poppins';


ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)


export default function App() {
  const [fontsLoaded] = useFonts({Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold})

  return (
    <>
      <StatusBar 
      barStyle="light-content"
      backgroundColor="transparent"
      translucent/>
      <Home/>
     </>
  );
}



import { ThemeProvider } from 'styled-components';
import { StatusBar, View } from 'react-native';

import * as ScreenOrientation from 'expo-screen-orientation';
import { Home } from './src/screens/Home/index';
import { RegisterGame } from './src/screens/RegisterGame';
import {useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold} from '@expo-google-fonts/poppins';
import theme from './src/theme';
import { Loading } from './src/Loading';

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)


export default function App() {
  const [fontsLoaded] = useFonts({Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold})

  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar 
          barStyle='light-content'
          backgroundColor="transparent"
          translucent/>
      { fontsLoaded ? <RegisterGame/> : <Loading/>}     
      </ThemeProvider>
    </>
  );
}



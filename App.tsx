import { StatusBar, View } from 'react-native';

import * as ScreenOrientation from 'expo-screen-orientation';
import { Home } from './src/screens/Home/index';


ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)


export default function App() {
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



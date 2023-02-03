
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  statusbar: {
    flexDirection: 'row',
    backgroundColor: '#F3D018',    
    justifyContent:'space-around',
    alignItems:'center', 
    height: 25,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },

  statusGame: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 2,
  },

  textGame: {
    color: '#fff',
    fontSize: 9,    
  },

  statusBar: {
    fontWeight: 'bold',
    color: "#4F4F4F",
    fontSize: 12
  }
})
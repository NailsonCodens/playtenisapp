import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({

  containerQueue: {
    flexDirection: 'row',
  },

  queue: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: 150,
    borderRadius: 5,
    padding: 20,
  },

  textQueue:{
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },

  JoinQueue: {
    backgroundColor: '#37B2F6',
    width: 145,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    borderRadius: 5,
  },
  
  textButton:{
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    padding:20,
    fontWeight: 'bold',
  }
})
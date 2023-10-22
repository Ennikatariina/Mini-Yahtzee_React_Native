import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerHome:{
    flex:1,
    alignItems:'center'
  },
  containerGameboard:{
    flex:1,
  },
  header: {
    marginBottom: 15,
    backgroundColor: '#8C647A',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    marginBottom:1,
    backgroundColor: '#8C647A',
    flexDirection: 'row'
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  /* gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }, */
  gameinfo: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
    marginHorizontal:20,
    color: '#090909',
    
  },
  gameinfoPlayer:{
    fontWeight:'bold',
    fontSize: 25,
    margin:10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Varjostuksen väri (musta, 75 % läpinäkyvä)
    textShadowOffset: { width:1, height: 1 }, // Siirtymä (vaaka- ja pystysuunnassa)
    textShadowRadius: 5, // Varjostuksen leveys

  },
  homeTitle:{
    color: '#050505',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 30,
    marginTop: 10,
    fontWeight:'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Varjostuksen väri (musta, 75 % läpinäkyvä)
    textShadowOffset: { width:1, height: 1 }, // Siirtymä (vaaka- ja pystysuunnassa)
    textShadowRadius: 5, // Varjostuksen leveys
  },
  /* row: {
    marginTop: 20,
    padding: 10
  }, */
 /*  flex: {
    flexDirection: "row"
  }, */
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#5D4A6A", //#A996AE
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color:"#ffffff",
    fontSize: 15
  },
  buttonGroup: {
    flexDirection: 'row', // Aseta komponentit vaakasuoraan riviin
    justifyContent: 'space-between', // Jakaa tilan komponenttien välillä
    alignItems: 'center', // Keskitä komponentit pystysuunnassa
  },
  textInputStyle:{
    width: '80%', 
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    backgroundColor:'#F2D5E5',
    fontSize:20,
    margin:20

  },
  text:{
    color:'#010101',
    fontSize:20,
    alignItems: 'center' 
  },
  background: {
    flex: 1,
    backgroundColor:'#F2D5E5',
  },
  pointrow:{
    justifyContent: 'space-between',
  },
  containerGameboard1:{
    alignItems: 'center'
  },
  textPlayer:{
    alignItems: 'center',
    fontWeight:'bold',
    margin:20
  },
  pointrow:{
    margin:10
  }

});
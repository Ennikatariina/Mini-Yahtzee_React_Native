import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerHome:{
    flex:1,
    alignItems:'center',

  },
  containerGameScoreboard:{
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
    fontFamily:'Roboto',
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontFamily:'Roboto',
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
    fontFamily:'Roboto',
    
  },
  gameinfoPlayer:{
    fontWeight:'bold',
    fontSize: 25,
    margin:10,
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // Varjostuksen väri (musta, 75 % läpinäkyvä)
    textShadowOffset: { width:1, height: 1 }, // Siirtymä (vaaka- ja pystysuunnassa)
    textShadowRadius: 4, // Varjostuksen leveys
    fontFamily:'Roboto',

  },
  homeTitle:{
    color: '#050505',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 30,
    marginTop: 10,
    fontWeight:'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // Varjostuksen väri (musta, 75 % läpinäkyvä)
    textShadowOffset: { width:1, height: 1 }, // Siirtymä (vaaka- ja pystysuunnassa)
    textShadowRadius: 4, // Varjostuksen leveys
    fontFamily:'Roboto',
  
  },
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
    fontSize: 15,
    fontFamily:'Roboto',
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
    margin:20,
    fontFamily:'Roboto',

  },
  text:{
    color:'#010101',
    fontSize:20,
    alignItems: 'center',
    fontFamily:'Roboto',
    margin:8
  },
  textTotal:{
    fontSize:30, 
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
    margin:20,
    fontFamily:'Roboto',
  },
  dataTableText: {
    fontFamily:'Roboto',
  },
  dataTableHeaderText:{
    fontFamily:'Roboto',
    fontWeight:'bold'
  },
  dataTableBox:{
    backgroundColor:'#f4dfeb',
    margin: 10,
    borderRadius:8,
    ...Platform.select({
      android: {
        elevation: 5, // Android-varjo
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },}),
  },
  dataTableRow:{
    borderColor:'#d7bbcb',
    borderTopWidth: 1,
  },
  pointsRowStyle:{
    borderColor:'#d7bbcb',
    borderWidth: 1,
    borderRadius:8,
    backgroundColor:'#f4dfeb', 
    margin:3,
    marginBottom:5,
    marginTop:20
  },
  pointsRowTextStyle:{
    textAlign:'center', 
    textAlignVertical:'center',
    marginBottom:8,
    marginTop:8
  },
  
});
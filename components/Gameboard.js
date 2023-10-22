import { useState, useEffect} from "react";
import { Text, View, Pressable, ImageBackground } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style'
import Footer from './Footer';
import Header from './Header';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS, SCOREBOARD_KEY } from "../constants/Game";
import { Container, Row, Col } from 'react-native-flex-grid';
import AsyncStorage from "@react-native-async-storage/async-storage";


let board=[]

export default function Gameboard({navigation, route}){

    const [playerName, setPlayerName]=useState('')
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [status, setStatus] =useState('Throw dices')
    const [gameEndStatus, setGameEndStatus]=useState(false)
    //Ovatko nopat kiinnitetty
    const [selectedDices, setSelectedDices]=
        useState(new Array(NBR_OF_DICES).fill(false))
    //Noppien silmäluvut
    const [diceSpots, setDiceSpots]=
        useState(new Array(NBR_OF_DICES).fill(0))
    //Onko silmäluvulle valittu pisteet
    const [selectedDicePoints, setSelectedDicePoints]=
        useState(new Array(MAX_SPOT).fill(false))
    //Kerätyt pisteet (Yhdelle numerolle/pistemäärälle?)
    const[dicePointsTotal, setDicePointsTotal]=
        useState(new Array(MAX_SPOT).fill(0))
    const [bonusPointText, setBonusPointText]=useState(`You are ${BONUS_POINTS_LIMIT} points away from bonus`)
    const[totalPoints, setTotalPoints]=useState(0)
    const[iconView, setIconView] =useState(true)
    //Tulostaulun pisteen
    const[scores, setScores]=useState([])

    //Asetetaan nimi playerName tilaan, kun Gameboard renderoidaan ensimäisen kerran. 
    useEffect(()=>{
        if (playerName === '' && route.params?.player){
            setPlayerName(route.params.player)
        } 
        },[])

    //Kun selectedDicePoints tila muuttuu, niin seuraavat toiminnot tehdään
    //Muunmuassa laskee kokonaispisteet ja pisteet bonuspisteisiin ja lisää +50 bonuspistettä.
    useEffect(()=>{
        setNbrOfThrowsLeft(NBR_OF_THROWS)
        selectedDices.fill(false)
        setStatus('Throw dices')
        let totalPointsCounter = dicePointsTotal.reduce((sum, point)=>sum + point, 0)
        let pointsMissing= BONUS_POINTS_LIMIT - totalPointsCounter
        if (pointsMissing > 0) {
            setTotalPoints(totalPointsCounter)
            setBonusPointText(`You are ${pointsMissing} points away from bonus`);
        }
        else{
            const newTotalPoints = totalPointsCounter + BONUS_POINTS;
            setTotalPoints(newTotalPoints)
            setBonusPointText(`Congrats! Bonus points (50) added`);
        }
        const allPointsSelected = selectedDicePoints.every((pointSelected) => pointSelected);
                    if (allPointsSelected) {
                        setGameEndStatus(true)
                    }
        },[selectedDicePoints])
        
        //Päivittää statuksen, kun gameEndStatuksen arvo on true ja gameEndStatukseen tulee muutos
    useEffect(() => {
        if (gameEndStatus) {
            savePlayerPoints()
            setStatus("Game over")
            }
        },[gameEndStatus])
    
    useEffect(() =>{
        const unsubscribe = navigation.addListener('focus',()=>{
            getScoreboardData()
            
        })
        return unsubscribe
    },[navigation])

    //Nopparivi 
    const dicesRow=[]
    for (let dice=0; dice< NBR_OF_DICES; dice++){
        dicesRow.push(
            <Col key={"dice" + dice}>
                <Pressable
                    key={"dice" + dice}
                    onPress={()=>selectDice(dice)}>
                    <MaterialCommunityIcons
                        name={board[dice]}
                        key= {"dice" +dice}
                        size={50}
                        color={getDiceColor(dice)}
                        >
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    const pointsRow=[]
    for (let spot=0; spot< MAX_SPOT; spot++){
        pointsRow.push(
            <Col key={"pointsRow" + spot}>
                <Text key={"pointsRow" + spot}>
                    {getSpotTotal(spot)}
                </Text>
            </Col>
        )
    }
    const pointsToSelectRow=[]
    for (let diceButton=0; diceButton< MAX_SPOT; diceButton++){
        pointsToSelectRow.push(
            <Col key={"diceButton" + diceButton}>
                <Pressable
                    key={"diceButton" + diceButton}
                    onPress={()=>selectDicePoints(diceButton)}
                    >
                    <MaterialCommunityIcons
                        name={"dice-" +(diceButton + 1) + "-outline"}
                        key= {"buttonRow" + diceButton}
                        size={45}
                        color={getDicePointsColor(diceButton)}
                        >
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }
  
    const selectDicePoints=(i)=>{
        //Jos heittoja ei ole jäljellä 
        if(nbrOfThrowsLeft===0){
                // Jotkut pisteet puuttuvat
                let selectedPoints =[...selectedDicePoints] //tämän lista arvot false/true
                let points =[...dicePointsTotal] 
                //Jos kyseissen numeron pisteitä ei ole valittu (Jos selectedPoints[i] false niin if tehdään)
                if(!selectedPoints[i]){
                    selectedPoints[i]=true
                    //Kuinka paljon nopparivilla on niitä noppia, joissa on käyttäjän pisteiksi valitut nopat
                    let nbrOfDices = diceSpots.reduce((total, x)=>(x===(i+1) ? total +1 : total ),0)
                    points[i]=nbrOfDices * (i + 1) 
                }
                //Jos yrittää valita toisen kerran saman numeron pisteet. 
                else{
                    setStatus('You already selected points for ' + (i+1))
                    return points[i]
                }
                setDicePointsTotal(points)
                setSelectedDicePoints(selectedPoints)
                return points[i]   
        }
        //Heittoja on jäljellä
        else{
            setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points')
        }    
    }

    //Heitetään noppaa
    const throwDices = () =>{
        setIconView(false)
        //3 heittoa mennyt, mutta peli ei ole loppu
        if (nbrOfThrowsLeft===0 && !gameEndStatus){
            setStatus('Select your points before the next throw')
            return 
        }
        //3 heittoa mennyt ja peli on loppu (valittu kaikki kuuden numeron pisteet)
        else if(nbrOfThrowsLeft===3 && gameEndStatus){
            //setGameEndStatus(false) //asetetaan gameEndStatus falseksi
            diceSpots.fill(0) 
            dicePointsTotal.fill(0) 
            setStatus("Game over")
        }
        else{
            
            let spots= [...diceSpots]
            for (let i=0; i<NBR_OF_DICES; i++){
                //Heitetään niitä noppia, joilla selectedDices arvon on false, eli jos noppaa ei ole kiinnitetty
                if(!selectedDices[i]){
                    let randonNumber = Math.floor(Math.random()* 6+1)
                    board[i]='dice-'+ randonNumber
                    spots[i]=randonNumber
                }
            }
            setDiceSpots(spots)
            setStatus('Select and throw dices again')
            if(nbrOfThrowsLeft===1){
                setStatus("Select your points before next throw ")
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1)
    }

    function getSpotTotal(i){
        return dicePointsTotal[i]
    }

    const selectDice =(i)=>{
        //Jos jäljellä olevien heittojen määrä on pienempi kuin heittojen alkuarvo ja peli ei ole päättynyt
        if(nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus){
            let dices=[...selectedDices]
            dices[i] =selectedDices[i] ? false :true //jos selectedDicen arvo false, niin vaihtaa en arvon true.
            setSelectedDices(dices)
        }
        else{
            setStatus('You have to throw dices first')
        }
    }

    //Muutetaan nopan väriä mustaksi, jos se on valitaan
    function getDiceColor(i){
        return selectedDices[i] ? "#372A31":"#658C64"
    }

    function getDicePointsColor(i){
        return selectedDicePoints[i]  ? "#372A31":"#658C64"
    }
    const restartGame = () => {
        setGameEndStatus(false)
        setStatus('Throw dices')
        totalPointsCounter = 0
        pointsMissing =0
        diceSpots.fill(0) 
        dicePointsTotal.fill(0)
        setTotalPoints(0)
        selectedDices.fill(0)
        selectedDicePoints.fill(0)
        setBonusPointText(`You are ${BONUS_POINTS_LIMIT} points away from bonus`)
    }
  /*  const restartGame = () => {
        // Käynnistää sovelluksen uudelleen nollaten sen tilat ja näkymät
        navigation.reset({
          index: 1,
          routes: [{ name: 'Gameboard' }],
        });
      }; */ 

    const savePlayerPoints = async() => {
        const newKey = scores.length + 1
        const currentDate = new Date();
        const playerPoints ={
            key:newKey,
            name:playerName,
            date:currentDate.toLocaleDateString(),
            time:currentDate.toLocaleTimeString(),
            points: totalPoints
        }
        try{
            const newScore =[...scores, playerPoints]
            const jsonValue = JSON.stringify(newScore)
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue)
        }
        catch(e){
            console.log('Save error: ' + e)
        }
        console.log(playerPoints)
      }

      const getScoreboardData = async () =>{
        try{
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if (jsonValue !== null){
                let tmpScores = JSON.parse(jsonValue)
                setScores(tmpScores)
            }
        }
        catch(e){
            console.log('Save error: ' + e)
        }
      }
    
    return(
        <>
            <ImageBackground
            source={require('../image/bokeh.jpg')}
            style={styles.background}
        >
            <Header/>
            <View style={styles.containerGameboard}>
                <View style={styles.containerGameboard1}>
                    {iconView ?
                    <MaterialCommunityIcons
                        name={"dice-multiple"}
                        key= {"dice-multiple"}
                        size={70}
                        color={'steelblue'}>
                    </MaterialCommunityIcons>
                    :
                    <Container fluid
                        style={styles.testi}>
                        <Row>{dicesRow}</Row>
                    </Container>
                    }
                </View>
                <View style={styles.containerGameboard1}>
                    <Text style={styles.text}>Throws left: {nbrOfThrowsLeft}</Text>
                    <Text style={styles.text}> {status}</Text>
                    {!gameEndStatus ? 
                        <Pressable
                            style={styles.button}
                            onPress={()=>throwDices()}>
                            <Text style={styles.buttonText}>THROW DICES</Text>
                        </Pressable>
                        :<View style={styles.buttonGroup}>
                        <Pressable
                        style={styles.button}
                        onPress={restartGame}>
                        <Text>START THE GAME AGAIN </Text>
                        </Pressable>
                        <Pressable
                        style={styles.button}
                        onPress={()=>navigation.navigate('Scoreboard')}>
                        <Text>GO SCOREBOARD</Text>
                        </Pressable>
                        </View>
                    }
                    <Text style={styles.text}>Total: {totalPoints}</Text>
                    <Text style={styles.text}>{bonusPointText}</Text>
                </View>
                <View style={styles.pointrow}>
                    <Container fluid>
                        <Row>{pointsRow}</Row>
                    </Container>
                    <Container fluid>
                        <Row>{pointsToSelectRow}</Row>
                    </Container>
                </View>
                <View style={styles.textPlayer}>
                    <Text style={styles.text}>Player: {playerName}</Text>
                </View>
            </View>
            <Footer/>
            </ImageBackground>
        </>
        
    )
}
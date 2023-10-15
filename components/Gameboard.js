import { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style'
import Footer from './Footer';
import Header from './Header';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from "../constants/Game";
import { Container, Row, Col } from 'react-native-flex-grid';

let board=[]


export default function Gameboard({navigation, route}){

    const [playerName, setPlayerName]=useState('')
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [status, setStatus] =useState('Throw dices')
    const [gameEndStatus, setGameEndStatus]=useState(false)
    //Ovatko nopat ovat kiinnitetty
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

    //Asetetaan nimi playerName tilaan. 
    useEffect(()=>{
        if (playerName === '' && route.params?.player){
            setPlayerName(route.params.player)
    
        } 
        },[])

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
                        name={"numeric-" +(diceButton + 1) + "-circle"}
                        key= {"buttonRow" + diceButton}
                        size={35}
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
            let selectedPoints =[...selectedDicePoints] //tämän lista arvot false/true
            let points =[...dicePointsTotal] 
            //Jos kyseissen numeron pisteitä ei ole valittu
            //Jos selectedPoints[i] false niin if tehdään
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

    //Kierrosten määrä muuttuja
    let nbrOfRollRounds=MAX_SPOT.length
    //Heitetään noppaa
    const throwDices = () =>{
        //3 heittoa mennyt, mutta peli ei ole loppu
        if (nbrOfThrowsLeft===0 && !gameEndStatus){
            setStatus('Select your points before the next throw')
            return 1
        }
        //3 heittoa mennyt ja peli on loppu (valittu kaikki kuuden numeron pisteet)
        else if(nbrOfThrowsLeft===0 && gameEndStatus){
            setGameEndStatus(false) //asetetaan gameEndStatus falseksi
            diceSpots.fill(0) 
            dicePointsTotal.fill(0) 
        }
        let spots= [...diceSpots]
        for (let i=0; i<NBR_OF_DICES; i++){
            //Heitetään niitä noppia, joilla selectedDices arvon on false, eli jos noppaa ei ole kiinnitetty
            if(!selectedDices[i]){
                let randonNumber = Math.floor(Math.random()* 6+1)
                board[i]='dice-'+ randonNumber
                spots[i]=randonNumber
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1)
        setDiceSpots(spots)
        setStatus('Select and throw dices again')
    }

    function getSpotTotal(i){
        return dicePointsTotal[i]
    }

    const selectDice =(i)=>{
        //Jos jäljellä olevien heittojen määrä on pienempi kuin heittojen alkuarvo ja peli ei ole päättynyt
        if(nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus){
            let dices=[...selectedDices]
            console.log(selectedDices[i])
            dices[i] =selectedDices[i] ? false :true //jos selectedDicen arvo false, niin vaihtaa en arvon true.
            setSelectedDices(dices)
        }
        else{
            setStatus('You have to throw dices first')
        }
    }
    //Muutetaan nopan väriä mustaksi, jos se on valitaan
    function getDiceColor(i){
        return selectedDices[i] ? "black":"steelblue"
    }

    function getDicePointsColor(i){
        return (selectedDicePoints[i]  && !gameEndStatus) ? "black":"steelblue"
    }



    return(
        <>
            <Header/>
            <View style={styles.container}>
                <Text>Gameboard</Text>
                <Container fluid>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text>Throws left: {nbrOfThrowsLeft}</Text>
                <Text> {status}</Text>
                <Pressable
                    style={styles.button}
                    onPress={()=>throwDices()}>
                    <Text>THROW DICES</Text>
                </Pressable>
                <Container fluid>
                    <Row>{pointsRow}</Row>
                </Container>
                <Container fluid>
                    <Row>{pointsToSelectRow}</Row>
                </Container>
                <Text>Player: {playerName}</Text>
            </View>
            <Footer/>
        </>
    )
}
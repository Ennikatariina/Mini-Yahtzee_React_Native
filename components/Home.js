import { useState } from "react";
import { TextInput, Text, View, Pressable, Keyboard, ImageBackground } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from './Footer';
import Header from './Header';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from "../constants/Game";
import styles from '../style/style'


export default Home =({navigation}) =>{
    const [playerName, setPlayerName]=useState('')
    const [hasPlayerName, setHasPlayerName]=useState(false)

    const handlePlayerName= (value) => {
        if (value.trim().length > 0 ){
            setHasPlayerName(true)
            Keyboard.dismiss()
        }
    }

    return (
        <> 
        <ImageBackground
            source={require('../image/bokeh.jpg')}
            style={styles.background}
        >
            <Header/>
            <View style={styles.containerHome}>
                <MaterialCommunityIcons name="information" size={90} color="#64738C"/>
                {!hasPlayerName?
                <>
                    <Text style={styles.gameinfo}> For scoreboard enter your name</Text>
                    <TextInput onChangeText={setPlayerName} autoFocus={true} style={styles.textInputStyle}/>
                    <Pressable
                        onPress={()=>handlePlayerName(playerName)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>OK</Text>
                    </Pressable>
                </>
                :
                <>
                <Text style={styles.homeTitle}>Rules of the games </Text>
                <Text multiline="true" style={styles.gameinfo}>
                    THE GAME: Upper section of the classic Yahtzee
                    dice game. You have {NBR_OF_DICES} dices and
                    for the every dice you have {NBR_OF_THROWS}
                    throws. After each throw you can keep dices in
                    order to get same dice spot counts as many as
                    possible. In the end of the turn you must select
                    your points from {MIN_SPOT} to {MAX_SPOT}.
                    Game ends when all points have been selected.
                    The order for selecting those is free.
                </Text>
                
                <Text multiline="true" style={styles.gameinfo}>
                    POINTS: After each turn game calculates the sum
                    for the dices you selected. Only the dices having
                    the same spot count are calculated. Inside the
                    game you can not select same points from
                    {MIN_SPOT} to {MAX_SPOT} again.
                </Text>
                <Text multiline="true" style={styles.gameinfo}>
                    GOAL: To get points as much as possible.
                    {BONUS_POINTS_LIMIT} points is the limit of
                    getting bonus which gives you {BONUS_POINTS}
                    points more.
                </Text>
                <Text style={styles.gameinfoPlayer}>Good luck, {playerName}</Text>
                <Pressable
                    style={styles.button}
                    onPress={()=>navigation.navigate('Gameboard', {player: playerName})}>
                    <Text style={styles.buttonText}>PLAY</Text>

                </Pressable>
                </>
                } 
            </View>
            <Footer/>
            </ImageBackground>
        </>
    )
}
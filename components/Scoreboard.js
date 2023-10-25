import { Text, View, Pressable, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import {DataTable} from "react-native-paper"
import Footer from './Footer';
import Header from './Header';
import styles from "../style/style";
import { NBR_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../constants/Game";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

export default Scoreboard = ({navigation}) =>{

    const { navigate } = useNavigation();
    const [scores, setScores]= useState([])

    useEffect(() =>{
        const unsubscribe = navigation.addListener('focus',()=>{
            getScoreboardData()
        })
        return unsubscribe
    },[navigation])

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

      const clearStorageBoard = async() =>{
        try{
            await AsyncStorage.clear()
            setScores([])
        }
        catch(e){
            console.log('clear error' + e)
        }
      }
      scores.sort((a, b) => b.points - a.points)
      
    return( 
        <>
        <ImageBackground
        source={require('../image/bokeh.jpg')}
        style={styles.background}
    >
            <Header/>
            <View style={styles.containerGameScoreboard}>
                <View >
                    {scores.length ===0 ?
                        <Text style={styles.text}>Scoreboard is empty</Text>
                        :
                        (
                        <View style={styles.dataTableBox}>
                        <DataTable>
                            <DataTable.Header>
                            <DataTable.Title> <Text style={styles.dataTableHeaderText}>Position </Text></DataTable.Title>
                            <DataTable.Title> <Text style={styles.dataTableHeaderText}> Name</Text> </DataTable.Title>
                            <DataTable.Title> <Text style={styles.dataTableHeaderText}> Date</Text></DataTable.Title>
                            <DataTable.Title> <Text style={styles.dataTableHeaderText}> Time</Text></DataTable.Title>
                            <DataTable.Title> <Text style={styles.dataTableHeaderText}> Points</Text></DataTable.Title>
                            </DataTable.Header>
                            {scores.map((player, index) => (
                            index < NBR_SCOREBOARD_ROWS && 
                                <View style={styles.dataTableRow}
                                    key={player.key}>
                                <DataTable.Row >
                                <DataTable.Cell><Text style={styles.dataTableText}>{index + 1}.</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={styles.dataTableText}>{player.name}</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={styles.dataTableText}>{player.date}</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={styles.dataTableText}>{player.time}</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={styles.dataTableText}>{player.points}</Text></DataTable.Cell>
                                </DataTable.Row>
                                </View>
                            
                            ))}
                        </DataTable>
                        </View>
                          )
                    }
                </View>
                <View style={styles.containerGameboard1}>
                    {scores.length ===0 ?
                    null
                    :
                        <Pressable 
                            style={styles.button}
                            onPress={()=>clearStorageBoard()}>
                            <Text style={styles.buttonText}>CLEAR SCOREBOARD</Text>
                        </Pressable>
                    }
                </View>
            </View>
            <Footer/>
            </ImageBackground>
        </>
    )

}

import { StyleSheet, View  ,SafeAreaView} from 'react-native';
import {useState,useEffect} from 'react'

// Font
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';


const fetchFonts = async () => {
  await Font.loadAsync({
    'grape':require('./assets/fonts/grape.ttf'),
    'playfair':require('./assets/fonts/playfair.ttf')
  })
}



export default function App() {

  const [dataLoaded,setDataLoaded] = useState(false)
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState()


  if(!dataLoaded) {
    return <AppLoading  
            startAsync={fetchFonts}
            onFinish={() => {setDataLoaded(true);console.log('font loaded')}}
            onError={(err) => console.log(err)}
          />
  }
  
  


  const StartGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
    setGuessRounds(0)
    console.log(selectedNumber)

  }

  const GameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds)

  }
  let contentOutput = <StartGameScreen StartGameHandler={StartGameHandler} />

    const NewGame = () => {
      setGuessRounds(0);
      setUserNumber(0);
    }

    if(userNumber && guessRounds <= 0) {
      contentOutput = <GameScreen userInput={userNumber} onGameOver={GameOverHandler} />
    } else if(guessRounds > 0) {
      contentOutput = <GameOver round={guessRounds} startGame={NewGame} number={userNumber}/>
    }

  


  return (
    <SafeAreaView style={styles.app}>

      <Header title="Guess the title" /> 



       {contentOutput}
      

    </SafeAreaView> );
}

const styles = StyleSheet.create({
      app: {
        flex: 1,
        
      }
});

import { StyleSheet, View  } from 'react-native';
import {useState,useEffect} from 'react'
import * as Font from 'expo-font';
import {AppLoading} from 'expo'


// import SVGImg  from "./public/games-time.svg"
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';

const fetchFonts = () => {
  Font.loadAsync({
    'playfair': require('./assets/fonts/playfair.ttf')
  })
}


export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState()

  const [dataLoaded,setDataLoaded] = useState(false)

  if(!dataLoaded) {
    return <AppLoading startAsync={fetchFonts}  onFinish={setDataLoaded.bind(this,true)} onError={(err)=>{console.log(err)}}/>
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
      contentOutput = <GameOver rounds={guessRounds} startGame={NewGame} />
    }


  


  return (
    <View style={styles.app}>
      <Header title="Guess the title" />

      {contentOutput}
      

    </View> );
}

const styles = StyleSheet.create({
      app: {
        flex: 1,
      }
});

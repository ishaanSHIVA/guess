import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen'

export default function App() {
  return (
    <View style={styles.app}>
      <Header title="Guess the title" />
      <StartGameScreen />

    </View> );
}

const styles = StyleSheet.create({
      app: {
        flex: 1,
      }
});

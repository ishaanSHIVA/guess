import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GameOver = ({ rounds, startGame }) => {
  return (
    <View style={styles.app}>
      <Text>The Game is Over.</Text>
      <Text>Rounds took: {rounds}</Text>
      <Button title="START GAME" onPress={startGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOver;

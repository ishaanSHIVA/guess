import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const random = Math.floor(Math.random() * (max - min) + min);

  if (random === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return random;
  }
};

const GameScreen = ({ userInput, onGameOver }) => {
  const [guessNumber, setGuessNumber] = useState(
    generateRandomBetween(1, 100, userInput)
  );
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = (direction) => {
    console.log(direction, userInput, guessNumber);
    if (
      (direction === "lower" && userInput > guessNumber) ||
      (direction === "high" && userInput < guessNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong!", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = guessNumber;
    } else {
      currentLow.current = guessNumber;
    }
    setGuessNumber(
      generateRandomBetween(
        currentLow.current,
        currentHigh.current,
        guessNumber
      )
    );
    setRounds(rounds + 1);
  };

  useEffect(() => {
    // console.log(userInput, guessNumber,use);
    if (parseInt(userInput) === parseInt(guessNumber)) {
      onGameOver(rounds);
    }
  }, [guessNumber, userInput, onGameOver]);

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{guessNumber}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="LOWER"
            onPress={nextGuessHandler.bind(this, "lower")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="HIGHER"
            onPress={nextGuessHandler.bind(this, "high")}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
} from "react-native";

import Color from "../constants/Color";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = ({ StartGameHandler }) => {
  const [userInput, setUserInput] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const UserInputHandler = (input) => {
    setUserInput(input.replace(/[^0-9]/g, ""));
  };

  const ResetUserInputHandler = () => {
    setUserInput("");
  };

  const ConfirmUserInputHandler = () => {
    Keyboard.dismiss();
    const chosenNumber = parseInt(userInput);

    if (isNaN(chosenNumber) || chosenNumber > 99 || chosenNumber <= 0) {
      Alert.alert("Invalid Number!", "Number has to be between 0 and 99", [
        { text: "Okay", style: "destructive", onPress: ResetUserInputHandler },
      ]);
      return;
    }

    setConfirmed(true);
    ResetUserInputHandler();
    setSelectedNumber(chosenNumber);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.text}>Start a New Game</Text>
        <Card style={styles.inputContainer}>
          <Text style={styles.title}>Select a Number</Text>
          <Input
            value={userInput}
            onChangeText={UserInputHandler}
            style={styles.textInput}
            blurOnSubmit={true}
            autoCapitalize={"none"}
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
          />

          <View style={styles.buttonContainer}>
            <View>
              <Button
                title="Reset"
                onPress={ResetUserInputHandler}
                color={Color.accent}
              />
            </View>
            <View>
              <Button
                title="Confirm"
                onPress={ConfirmUserInputHandler}
                color={Color.primary}
              />
            </View>
          </View>
        </Card>

        {confirmed && (
          <Card style={styles.summary}>
            <Text>You selected</Text>
            <View>
              <NumberContainer>{selectedNumber}</NumberContainer>
              <Button
                onPress={StartGameHandler.bind(this, selectedNumber)}
                title="START GAME"
              />
            </View>
          </Card>
        )}
      </View>
    </TouchableWithoutFeedback>
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
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  textInput: {
    width: 50,
    textAlign: "center",
  },
  summary: {
    alignItems: "center",
    marginVertical: 40,
  },
});

export default StartGameScreen;

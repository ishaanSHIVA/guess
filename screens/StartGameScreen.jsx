import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import Color from "../constants/Color";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = ({ StartGameHandler }) => {
  // ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_DOWN);

  const [userInput, setUserInput] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    const eventLayout = Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

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
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.text}>Start a New Game</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText style={styles.title}>Select a Number</BodyText>
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
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={ResetUserInputHandler}
                    color={Color.accent}
                  />
                </View>
                <View style={styles.button}>
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
                <BodyText>You selected</BodyText>
                <View>
                  <NumberContainer>{selectedNumber}</NumberContainer>
                  <MainButton
                    onPress={StartGameHandler.bind(this, selectedNumber)}
                  >
                    START GAME
                  </MainButton>
                </View>
              </Card>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
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
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
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

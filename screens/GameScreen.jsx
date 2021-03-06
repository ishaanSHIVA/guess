import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import DefaultStyles from "../constants/default-styles";
import BodyText from "../components/BodyText";

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

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText style={{ fontSize: 20 }}>#{listLength - itemData.index}</BodyText>
    <BodyText style={{ fontSize: 20 }}>{itemData.item}</BodyText>
  </View>
);

const GameScreen = ({ userInput, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userInput);
  const [guessNumber, setGuessNumber] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([]);
  const [availableWidth, setavailableWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableHeight, setavailableHeight] = useState(
    Dimensions.get("window").height
  );

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
      currentLow.current = guessNumber + 1;
    }
    setGuessNumber(
      generateRandomBetween(
        currentLow.current,
        currentHigh.current,
        guessNumber
      )
    );
    setPastGuesses((pastGuesses) => [guessNumber.toString(), ...pastGuesses]);
    console.log(pastGuesses);
  };

  useEffect(() => {
    const updateLayout = () => {
      setavailableHeight(Dimensions.get("window").height);
      setavailableWidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    // console.log(userInput, guessNumber,use);
    if (parseInt(userInput) === parseInt(guessNumber)) {
      onGameOver(pastGuesses.length);
    }
  }, [guessNumber, userInput, onGameOver]);

  let listStyle = styles.listContainer;

  if (availableWidth < 350) {
    listStyle = styles.listContainerBig;
  }

  if (availableHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <View style={styles.button}>
            <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </MainButton>
          </View>
          <NumberContainer>{guessNumber}</NumberContainer>

          <View style={styles.button}>
            <MainButton onPress={nextGuessHandler.bind(this, "high")}>
              <Ionicons name="md-add" size={24} color="white" />
            </MainButton>
          </View>
        </View>
        <View style={listStyle}>
          {/* <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView> */}
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{guessNumber}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View style={styles.button}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.button}>
          <MainButton onPress={nextGuessHandler.bind(this, "high")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
      </Card>
      <View style={listStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 50 : 5,
    width: 300,
    maxWidth: "80%",
  },
  listItem: {
    backgroundColor: "white",
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 30,
  },
  list: {
    flexGrow: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  listContainer: {
    width: "60%",
    flex: 1,
  },
  listContainerBig: {
    flex: 1,
    width: "80%",
  },
});

export default GameScreen;

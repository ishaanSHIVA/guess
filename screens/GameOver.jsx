import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import TitleText from "../components/BodyText";
import Color from "../constants/Color";
import MainButton from "../components/MainButton";
const GameOver = ({ round, startGame, number }) => {
  return (
    <View style={styles.app}>
      <TitleText>The Game is Over.</TitleText>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={1000}
          source={require("../assets/won.png")}
          //   source={{uri:}}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={{ marginHorizontal: 100 }}>
        <TitleText style={{ textAlign: "center" }}>
          Your phone needed{" "}
          <Text
            style={{
              fontFamily: "playfair",
              color: Color.primary,
              fontSize: 30,
            }}
          >
            {round}
          </Text>{" "}
          to guess the number{" "}
          <Text
            style={{
              fontFamily: "playfair",
              color: Color.primary,
              fontSize: 30,
            }}
          >
            {number} .
          </Text>
        </TitleText>
        <MainButton onPress={startGame}>START GAME</MainButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 300,
    height: 300,
    marginVertical: 10,
  },
});

export default GameOver;

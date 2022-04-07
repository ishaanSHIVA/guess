import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

import TitleText from "../components/BodyText";
import Color from "../constants/Color";
import MainButton from "../components/MainButton";
const GameOver = ({ round, startGame, number }) => {
  const [availableWidth, setavailableWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableHeight, setavailableHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      setavailableHeight(Dimensions.get("window").height);
      setavailableWidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => Dimensions.removeEventListener("change", updateLayout);
  });

  return (
    <ScrollView>
      <View style={styles.app}>
        <TitleText style={{ color: Color.accent }}>The Game is Over.</TitleText>
        <View
          style={{ width: availableWidth * 0.7, height: availableHeight * 0.6 }}
        >
          <Image
            fadeDuration={1000}
            source={require("../assets/won.png")}
            //   source={{uri:}}
            resizeMode="contain"
            style={styles.image}
            // <a href="https://iconscout.com/illustrations/gamer" target="_blank">Gamer Illustration</a> by <a href="https://iconscout.com/contributors/delesign" target="_blank">Delesign Graphics</a>
          />
        </View>
        <View style={{ marginHorizontal: 100 }}>
          <TitleText style={{ textAlign: "center", color: Color.accent }}>
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
            guesses to guess the number{" "}
            <Text
              style={{
                fontFamily: "playfair",
                color: Color.primary,
                fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
              }}
            >
              {number} .
            </Text>
          </TitleText>
          <MainButton onPress={startGame}>START GAME</MainButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").height * 0.6,
    // marginVertical: Dimensions.get("window").height < 500 ? 20 : 5,
  },
});

export default GameOver;

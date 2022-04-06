import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Color from "../constants/Color";

const NumberContainer = (props) => {
  return (
    <View style={styles.numberContainer}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    borderWidth: 2,
    borderColor: Color.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  number: {
    color: Color.accent,
    fontSize: 22,
  },
});

export default NumberContainer;

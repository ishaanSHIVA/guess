import React from "react";
import { Text } from "react-native";

const BodyText = (props) => (
  <Text style={{ ...props.style, fontFamily: "playfair" }}>
    {props.children}
  </Text>
);

export default BodyText;

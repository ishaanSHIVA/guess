import React from "react";
import { Text } from "react-native";

const BodyText = (props) => (
  <Text style={{ ...props.style, fontFamily: "grape" }}>{props.children}</Text>
);

export default BodyText;

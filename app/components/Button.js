/** */

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../config/Colors";

export default ({ buttonStyle, textStyle, onPress, text }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.saveButtonLabel, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    backgroundColor: Colors.white,
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonLabel: {
    color: Colors.primary,
    fontSize: 25,
    fontWeight: "bold",
  },
});

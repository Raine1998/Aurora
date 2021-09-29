import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../app/config/Colors";

export default ({ isChecked, onChecked, ...props }) => {
  return (
    <View>
      <TouchableOpacity style={styles.checkbox} onPress={onChecked}>
        <Text style={styles.checkSign}>{isChecked ? "✓" : ""}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 40,
    height: 40,
    margin: 5,
    backgroundColor: Colors.white,
    color: Colors.primary,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkSign: {
    color: Colors.primary,
  },
});

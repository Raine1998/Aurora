import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Colors from "../config/Colors";

export default ({
  labelStyle,
  label,
  errorMessage,
  inputStyle,
  text,
  onChangeText,
  ...inputProps
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={labelStyle}>{label}</Text>
        <Text style={styles.errorMessage}>
          {errorMessage && `* ${errorMessage}`}
        </Text>
      </View>
      <TextInput
        selectionColor="transparent"
        style={[styles.input, inputStyle]}
        value={text}
        onChangeText={onChangeText}
        {...inputProps} //generic input props that we dont manually pull will be passed onto the TextInput component
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    margin: 4,
  },
  labelContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  input: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    paddingLeft: 4,
    height: 32,
    fontSize: 24,
    color: Colors.black,
  },
  errorMessage: {
    color: Colors.red,
    fontSize: 15,
    marginLeft: 4,
  },
});

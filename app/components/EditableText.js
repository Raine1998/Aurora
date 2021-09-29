// editable name component of the routine steps

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Colors from "../config/Colors";
import Checkbox from "./Checkbox";

export default ({ isChecked, onChangeText, text }) => {
  const [isEditMode, setEditMode] = useState(false);

  return (
    <TouchableOpacity
      style={styles.editStepButton}
      onPress={() => {
        setEditMode(true);
      }}
    >
      {isEditMode ? (
        <TextInput
          selectionColor={"transparent"}
          autoFocus={true}
          value={text}
          onChangeText={onChangeText}
          placeholder={"New step"}
          onSubmitEditing={() => {}}
          maxLength={30}
          style={styles.input}
          onBlur={() => {
            setEditMode(false);
          }}
        />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editStepButton: {
    flex: 1,
  },
  input: {
    color: Colors.black,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 0.5,
    padding: 3,
    height: 25,
    fontSize: 30,
  },
  text: {
    //the routine step name
    color: Colors.primary,
    padding: 3,
    fontSize: 30,
    fontWeight: "bold",
  },
});

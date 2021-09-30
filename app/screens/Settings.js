/**
This screen is just the log out button and functionality
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../config/Colors";
import Button from "../components/Button";
import { auth } from "firebase";

export default () => {
  return (
    <View style={styles.container}>
      <Button
        text="Log out"
        onPress={() => {
          auth().signOut(); //tell the app no one is signed in
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: "space-between",
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
    color: Colors.primary,
    padding: 3,
    fontSize: 20,
    fontWeight: "bold",
  },
});

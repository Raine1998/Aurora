import React from "react";
import { Image, StyleSheet, View } from "react-native";

import Colors from "../config/Colors";

function ViewImageScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}></View>
      <View style={styles.deleteIcon}></View>

      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../assets/neogencleanser.png")}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primary,
    position: "absolute",
    top: 40,
    left: 30,
  },
  deleteIcon: {
    width: 50,
    height: 50,
    backgroundColor: Colors.secondary,
    position: "absolute",
    top: 40,
    right: 30,
  },

  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});

export default ViewImageScreen;

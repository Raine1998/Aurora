import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../config/Colors";

function MorningRoutineScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Morning Routine Screen</Text>

      <View style={styles.content}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "90%",
    height: "90%",
    backgroundColor: Colors.white,
  },
});
export default MorningRoutineScreen;

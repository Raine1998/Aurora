import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../config/Colors";

function DiaryScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.calendarBar}></View>
      <Text>Diary Screen</Text>

      <View style={styles.content}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  calendarBar: {
    width: "100%",
    height: "80%",
    backgroundColor: Colors.secondary,
  },
  content: {
    width: "90%",
    height: "80%",
    backgroundColor: Colors.white,
  },
});
export default DiaryScreen;

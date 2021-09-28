import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../app/config/Colors";

const RoutineStep = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text styles={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.trashButton}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    padding: 35,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 2,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  trashButton: {
    width: 30,
    height: 30,
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 2,
    opacity: 0.4,
    borderRadius: 10,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
});

export default RoutineStep;

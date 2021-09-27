import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../config/Colors";

function ShelfScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Shelf Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
});
export default ShelfScreen;

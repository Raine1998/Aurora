import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Colors from "../config/Colors";
import { Ionicons } from "@expo/vector-icons";

export default () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        renderItem={({ item, index }) => {
          return <View> </View>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  icon: {
    padding: 5,
    fontSize: 32,
    color: Colors.primary,
  },
});

import React, { useState, useLayoutEffect } from "react";
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

const renderAddListIcon = (addItem) => {
  return (
    <TouchableOpacity
      onPress={() => addItem({ text: "hello2", isChecked: false })}
    >
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
};

export default ({ navigation }) => {
  const [routineItems, setRoutineItems] = useState([
    { text: "hello", isChecked: false },
  ]);

  const addItemToRoutineList = (item) => {
    routineItems.push(item);
    setRoutineItems([...routineItems]);
  };

  const removeItemFromRoutineList = (index) => {
    routineItems.splice(index, 1);
    setRoutineItems([...routineItems]);
  };

  //the + button on the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(addItemToRoutineList),
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={routineItems}
        keyExtractor={(item, index) => index.toString()} // key
        renderItem={({ item: { text, isChecked }, index }) => {
          return <Text>{text}</Text>;
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

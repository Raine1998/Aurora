/** RoutineList is a screen that stores a list of RoutineStep components */

import React, { useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Colors from "../config/Colors";
import { Ionicons } from "@expo/vector-icons";
import RoutineStep from "../components/RoutineStep";

//the + button on the header
const renderAddListIcon = (addItem) => {
  return (
    <TouchableOpacity onPress={() => addItem({ text: "", isChecked: false })}>
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
};

export default ({ navigation }) => {
  const [routineItems, setRoutineItems] = useState([
    { text: "Cleanser", isChecked: false },
  ]);

  const addItemToRoutineList = (item) => {
    routineItems.push(item);
    setRoutineItems([...routineItems]);
  };

  const removeItemFromRoutineList = (index) => {
    routineItems.splice(index, 1);
    setRoutineItems([...routineItems]);
  };

  const updateItem = (index, item) => {
    routineItems[index] = item;
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
          return (
            <RoutineStep
              text={text}
              isChecked={isChecked}
              onChecked={() => {
                const routineItem = routineItems[index];
                routineItem.isChecked = !isChecked; //set the ischecked to the opposite so that when the checkbox is clicked, it toggles
                updateItem(index, routineItem);
              }}
              onChangeText={(newText) => {
                const routineItem = routineItems[index];
                routineItem.text = newText;
                updateItem(index, routineItem);
              }}
              onDelete={() => {
                //ask user for confirmation before delete
                Alert.alert("Delete this step?", "", [
                  {
                    text: "Delete",
                    onPress: () => removeItemFromRoutineList(index),
                  },
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                ]);
              }}
            />
          );
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

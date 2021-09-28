// The main screen of the application. It has a list of routines --it can be edited by the user
// each routine is a RoutineButton component
//when pressed, it leads to a list of steps that are also  editable
//each step is a component

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

const RoutineButton = ({ title, navigation, onDelete }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("RoutineList", { title });
      }}
      style={styles.itemContainer}
    >
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="options-outline" size={27} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Delete this routine?", "", [
              { text: "Delete", onPress: onDelete },
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ])
          }
        >
          <Ionicons name="trash-outline" size={27} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const renderAddListIcon = (addItem) => {
  return (
    <TouchableOpacity onPress={() => addItem({ title: "title" })}>
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
};

export default ({ navigation }) => {
  const [routineList, setRoutineList] = useState([
    { title: "Morning" },
    { title: "Night" },
    { title: "Weekend" },
  ]);

  const addItemToRoutineList = (item) => {
    routineList.push(item);
    setRoutineList([...routineList]);
  };

  const removeItemFromRoutineList = (index) => {
    routineList.splice(index, 1);
    setRoutineList([...routineList]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(addItemToRoutineList),
    });
  });

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/appname.png")} />

      <View style={styles.content}>
        <FlatList
          data={routineList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: { title }, index }) => {
            return (
              <RoutineButton
                title={title}
                navigation={navigation}
                onDelete={() => removeItemFromRoutineList(index)}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  logo: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
  },
  content: {
    flex: 1,
    height: "70%",
    top: 200,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    borderRadius: 20,
    borderColor: Colors.secondary,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: Colors.white,
  },
  icon: {
    padding: 5,
    fontSize: 32,
    color: Colors.primary,
  },
  itemTitle: {},
});

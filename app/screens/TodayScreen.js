/**
The main screen of the application. It has a list of routines --it can be edited by the user
each routine is a RoutineButton component
when pressed, it leads to a RoutineList screen which is list of RoutineStep components
that are also editable
 */

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

const RoutineButton = ({ title, navigation, onDelete, onOptions }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("RoutineList", { title }); //go to RoutineList screen
      }}
      style={styles.itemContainer}
    >
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {/* Options button */}
        <TouchableOpacity onPress={onOptions}>
          <Ionicons name="options-outline" size={27} color={Colors.primary} />
        </TouchableOpacity>

        {/* Trash button */}
        <TouchableOpacity
          onPress={() =>
            //ask user for confirmation before delete
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

const renderAddListIcon = (navigation, addItemToRoutineList) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("EditRoutineList", {
          saveChanges: addItemToRoutineList,
        });
      }}
    >
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

  const updateRoutineList = (index, item) => {
    routineList[index] = item;
    setRoutineList([...routineList]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(navigation, addItemToRoutineList),
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
                onOptions={() => {
                  navigation.navigate("EditRoutineList", {
                    title,
                    saveChanges: (item) => updateRoutineList(index, item),
                  });
                }}
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
    borderWidth: 2,
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
  itemTitle: {
    //"the routine titles"
    fontWeight: "bold",
    fontSize: 25,
    color: Colors.primary,
  },
});

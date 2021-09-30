/**
  The main screen of the application. It has a list of routines --it can be edited by the user
  each routine is a RoutineButton component
  when pressed, it leads to a RoutineList screen which is list of RoutineStep components
  that are also editable
 */

import React, { useState, useLayoutEffect, useEffect } from "react";
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
import {
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  removeDoc,
} from "../services/Collections";
import { auth, firestore } from "firebase";

//component
const RoutineButton = ({ title, navigation, onDelete, onOptions, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
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

//header buttons
const renderAddListIcon = (navigation, addItemToRoutineList) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {/* Logout button */}
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Ionicons name="settings" size={27} color={Colors.primary} />
      </TouchableOpacity>

      {/* Add button */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditRoutineList", {
            saveChanges: addItemToRoutineList,
          });
        }}
      >
        <Text style={styles.addIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ({ navigation }) => {
  const [routineList, setRoutineList] = useState([
    { title: "Morning" },
    { title: "Night" },
    { title: "Weekend" },
  ]);

  const routineListRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("lists");

  //each time the db is updated, also update the routinelist
  useEffect(() => {
    onSnapshot(
      routineListRef,
      (newLists) => {
        setRoutineList(newLists);
      },
      {
        //sort the items in the lists
        sort: (a, b) => {
          if (a.index < b.index) {
            return -1;
          }
          if (a.index > b.index) {
            return 1;
          } else {
            return 0;
          }
        },
      }
    );
  }, []);

  const addItemToRoutineList = ({ title }) => {
    const index =
      routineList.length > 1
        ? routineList[routineList.length - 1].index + 1
        : 0;
    addDoc(routineListRef, { title, index });
  };

  const removeItemFromRoutineList = (id) => {
    removeDoc(routineListRef, id);
  };

  const updateRoutineList = (id, item) => {
    updateDoc(routineListRef, id, item);
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
          renderItem={({ item: { title, id, index } }) => {
            return (
              <RoutineButton
                title={title}
                navigation={navigation}
                onPress={() => {
                  navigation.navigate("RoutineList", { title, listId: id }); //go to RoutineList screen
                }}
                onOptions={() => {
                  navigation.navigate("EditRoutineList", {
                    title,
                    saveChanges: (newItem) =>
                      updateRoutineList(id, { index, ...newItem }),
                  });
                }}
                onDelete={() => removeItemFromRoutineList(id)}
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
  addIcon: {
    padding: 5,
    fontSize: 32,
    color: Colors.primary,
    marginRight: 8,
  },
  settingsIcon: {
    justifyContent: "center",
    marginRight: 4,
  },
  itemTitle: {
    //"the routine titles"
    fontWeight: "bold",
    fontSize: 25,
    color: Colors.primary,
  },
});

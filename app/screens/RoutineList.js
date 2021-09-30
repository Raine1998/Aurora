/** RoutineList is a screen that stores a list of RoutineStep components */

import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Colors from "../config/Colors";
import RoutineStep from "../components/RoutineStep";
import {
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  removeDoc,
} from "../services/Collections";
import { auth, firestore } from "firebase";

//the + button on the header
const renderAddListIcon = (addItem) => {
  return (
    <TouchableOpacity onPress={() => addItem()}>
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
};

export default ({ navigation, route }) => {
  let [routineItems, setRoutineItems] = useState([]); // { text: "Cleanser", isChecked: false },

  const [newRoutineItem, setNewRoutineItem] = useState();

  const routineItemRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("lists")
    .doc(route.params.listId)
    .collection("routineItems");

  useEffect(() => {
    onSnapshot(
      routineItemRef,
      (newRoutineStep) => {
        setRoutineItems(newRoutineStep);
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

  const addItemToRoutineList = () => {
    setNewRoutineItem({ text: "", isChecked: false, new: true });
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

  if (newRoutineItem) {
    routineItems = [newRoutineItem, ...routineItems];
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={routineItems}
        keyExtractor={(item, index) => index.toString()} // key
        renderItem={({ item: { text, isChecked, id, ...params }, index }) => {
          return (
            <RoutineStep
              {...params}
              text={text}
              isChecked={isChecked}
              onChecked={() => {
                let data = { text, isChecked: !isChecked };
                if (id) {
                  data.id = id; //idl?
                }
                addDoc(routineItemRef, data);
              }}
              onChangeText={(newText) => {
                if (params.new) {
                  setNewRoutineItem({
                    text: newText,
                    isChecked,
                    new: params.new,
                  });
                } else {
                  routineItems[index].text = newText;
                  setRoutineItems([...routineItems]);
                }
              }}
              onDelete={() => {
                //ask user for confirmation before delete
                Alert.alert("Delete this step?", "", [
                  {
                    text: "Delete",
                    onPress: () => {
                      params.new
                        ? setNewRoutineItem(null)
                        : removeItemFromRoutineList(index);
                      id && removeDoc(routineItemRef, id); //modifies the firebase
                    },
                  },
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                ]);
              }}
              //when user leaves the text inpu, save the text value
              onBlur={() => {
                //ensure that text has at least one character in it
                if (text.length > 1) {
                  let data = { text, isChecked };
                  if (id) {
                    data.id = id;
                  }
                  addDoc(routineItemRef, data); //adding and updating items
                  //if item is new
                  params.new && setNewRoutineItem(null);
                } else {
                  params.new
                    ? setNewRoutineItem(null)
                    : removeItemFromRoutineList(index);
                }
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

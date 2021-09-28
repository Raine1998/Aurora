import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";
import Colors from "../config/Colors";
import RoutineStep from "../../components/RoutineStep";

function MorningRoutineScreen(props) {
  const [routine, setRoutine] = useState();
  const [routineItems, setRoutineItems] = useState([]);

  const handleAddRoutine = () => {
    Keyboard.dismiss();
    setRoutineItems([...routineItems, routine]);
    setRoutine(null);
  };

  // deletes a routine
  const deleteRoutine = (index) => {
    let itemsCopy = [...routineItems];
    itemsCopy.splice(index, 1);
    setRoutineItems(itemsCopy);
  };

  const editRoutine = (index) => {
    console.log("edit routine");

    let itemsCopy = [...routineItems];
    itemsCopy[index];
    console.log(itemsCopy[index].name);
  };

  const stepPressed = (index) => {
    console.log("stepPressed");

    Alert.alert("Edit", "", [
      { text: "EditRoutine", onPress: () => editRoutine(index) },
      {
        text: "DeleteRoutine",
        onPress: () =>
          Alert.alert("Delete this routine?", "---", [
            { text: "Yes", onPress: () => deleteRoutine(index) },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.scroll}>
          {/* default routines*/}
          <TouchableOpacity>
            <RoutineStep text={"Cleanser"} />
          </TouchableOpacity>

          {/* where new routines are added */}
          {routineItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => stepPressed(index)}>
                <RoutineStep text={item} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Add a new routine */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"add a new routine"}
          value={routine}
          onChangeText={(text) => setRoutine(text)}
        />
        <TouchableOpacity
          onPress={() =>
            setRoutine.length != -1
              ? handleAddRoutine()
              : console.log("name of routine is empty")
          }
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "90%",
    height: "85%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    bottom: 40,
  },
  scroll: {},
  writeTaskWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: Colors.white,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {},
});
export default MorningRoutineScreen;

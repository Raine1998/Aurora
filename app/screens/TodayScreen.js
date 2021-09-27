import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";

import Colors from "../config/Colors";
import Routine from "../../components/Routine";

function TodayScreen(props) {
  console.log("app executed");

  const [routine, setRoutine] = useState();
  const [routineItems, setRoutineItems] = useState([]);

  const handleAddRoutine = () => {
    Keyboard.dismiss();
    setRoutineItems([...routineItems, routine]);
    setRoutine(null);
  };

  // deletes a routine
  const completeRoutine = (index) => {
    let itemsCopy = [...routineItems];
    itemsCopy.splice(index, 1);
    setRoutineItems(itemsCopy);
  };

  const editRoutine = (index) => {
    console.log("edit routine");
    let itemsCopy = [...routineItems];
  };

  const editDefaultRoutine = () => {
    console.log("edit routine");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/appname.png")} />
      {/*Todo list  */}
      <View style={styles.taskWrapper}>
        <Text styles={styles.sectionTitle}>Today's routines</Text>

        <View style={styles.items}>
          {/* This is where the routines will go */}

          {/* default routines*/}
          <TouchableOpacity onPress={() => editDefaultRoutine()}>
            <Routine text={"Morning Routine"}></Routine>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => editDefaultRoutine()}>
            <Routine text={"Night Routine"}></Routine>
          </TouchableOpacity>

          {/* where new routines are added */}
          {routineItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => editRoutine(index)}>
                <Routine text={item} />
              </TouchableOpacity>
            );
          })}

          <Routine text={"Photo Log"}></Routine>
        </View>
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
        <TouchableOpacity onPress={() => handleAddRoutine()}>
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
  },
  logo: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
  },
  taskWrapper: {
    paddingTop: 200,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.primary,
  },
  items: {
    margin: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 30,
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

export default TodayScreen;

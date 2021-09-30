/**
This screen opens when the user presses the option button of a RoutineList
in the RoutineList screen
or when the user creates a new routine so that they can imput the name. 
this is because pressing the routine opens up the routine steps screen (RoutineList)
 */

import { CommonActions } from "@react-navigation/routers";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { color } from "react-native-reanimated";
import Colors from "../config/Colors";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
export default ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title || " ");

  const [isValid, setValid] = useState(true); //for checking if routine name is empty
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.invalidName}>
          <Text style={styles.text}>Routine Name</Text>
          {/* ensure that routine name is not empty */}
          {!isValid && (
            <Text style={styles.errorMessage}>
              *Routine name cannot be empty
            </Text>
          )}
        </View>

        <TextInput
          selectionColor={"transparent"}
          autoFocus={true}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setValid(true);
          }}
          placeholder={"New routine name"}
          maxLength={30}
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          if (title.length > 1) {
            route.params.saveChanges({ title });
            navigation.dispatch(CommonActions.goBack()); //takes user back to the previous screen -- which is the TodayScreen
          } else {
            //if routine title is empty
            setValid(false);
          }
        }}
      >
        <Text style={styles.saveButtonLabel}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: "space-between",
  },
  input: {
    color: Colors.black,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 0.5,
    padding: 3,
    height: 25,
    fontSize: 30,
  },
  text: {
    color: Colors.primary,
    padding: 3,
    fontSize: 20,
    fontWeight: "bold",
  },
  saveButton: {
    borderRadius: 25,
    backgroundColor: Colors.white,
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonLabel: {
    color: Colors.primary,
    fontSize: 25,
    fontWeight: "bold",
  },
  invalidName: {
    flexDirection: "row",
  },
  errorMessage: {
    color: Colors.red,
    fontSize: 15,
    marginLeft: 4,
  },
});

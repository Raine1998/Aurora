import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Colors from "../config/Colors";
import Checkbox from "./Checkbox";
import EditableText from "./EditableText";

// const EditableText = ({ isChecked, onChangeText, text }) => {
//   const [isEditMode, setEditMode] = useState(false);

//   return (
//     <TouchableOpacity
//       style={styles.editStepButton}
//       onPress={() => {
//         setEditMode(true);
//       }}
//     >
//       {isEditMode ? (
//         <TextInput
//           selectionColor={"transparent"}
//           autoFocus={true}
//           value={text}
//           onChangeText={onChangeText}
//           placeholder={"New step"}
//           onSubmitEditing={() => {}}
//           maxLength={30}
//           style={styles.input}
//           onBlur={() => {
//             setEditMode(false);
//           }}
//         />
//       ) : (
//         <Text style={styles.text}>{text}</Text>
//       )}
//     </TouchableOpacity>
//   );
// };

export default ({ text, isChecked, onChecked, onChangeText, onDelete }) => {
  //
  const [isEditMode, setEditMode] = useState(false);

  return (
    <View style={styles.container}>
      {/* routine steps goes here */}
      <View style={styles.itemLeft}>
        <Checkbox isChecked={isChecked} onChecked={onChecked} />
        <EditableText
          text={text}
          onChangeText={onChangeText}
          isChecked={isChecked}
        />
      </View>
      {/* delete button */}
      <TouchableOpacity onPress={onDelete}>
        <Text
          style={(styles.icon, { fontWeight: "900", color: Colors.primary })}
        >
          X
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    fontSize: 30,
  },
  itemLeft: {
    //the box that encases each step
    flexDirection: "row",
    flex: 1,

    backgroundColor: Colors.white,
    alignItems: "center",
    height: 80,
    borderRadius: 20,
    borderColor: Colors.secondary,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
  },

  icon: {
    padding: 5,
    fontSize: 16,
    color: Colors.primary,
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
    //the routine step name
    color: Colors.primary,
    padding: 3,
    fontSize: 30,
    fontWeight: "bold",
  },
  editStepButton: {
    flex: 1,
  },
});

import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../config/Colors";

function DiaryScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      {/* clickable images */}
      <TouchableHighlight
        underlayColor="pink"
        onPress={() => console.log("image tapped.")}
      >
        <Image
          style={{ width: 400, height: "103%" }}
          source={require("../ScreenImages/DiaryScreen.png")}
        />
      </TouchableHighlight>
    </SafeAreaView>
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
    backgroundColor: Colors.white,
  },
});
export default DiaryScreen;

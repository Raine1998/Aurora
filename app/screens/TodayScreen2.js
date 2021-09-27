import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import Colors from "../config/Colors";
import Routine from "../../components/Routine";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const NewRoutine = () => {
  <View style={styles.container}>
    {/* logo */}
    <Image style={styles.logo} source={require("../assets/appname.png")} />
    <Text>Hello</Text>
  </View>;
};

function TodayScreen2(props) {
  console.log("app executed");

  return (
    <View style={styles.container}>
      {/* logo */}
      <Image style={styles.logo} source={require("../assets/appname.png")} />
      <Text>Hello</Text>
    </View>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Morning Routine" component={NewRoutine} />
    //   </Stack.Navigator>
    // </NavigationContainer>
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
});

export default TodayScreen2;

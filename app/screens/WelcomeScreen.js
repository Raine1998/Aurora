import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Alert,
} from "react-native";
import Colors from "../config/Colors";

function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.background}>
      <Image style={styles.logo} source={require("../assets/appname.png")} />

      <View style={styles.buttonWrap}>
        <View style={styles.loginButton}>
          <Button
            title="Login"
            onPress={() =>
              Alert.alert("Login", "My message", [
                { text: "Yes", onPress: () => console.log("Yes") },
                { text: "No", onPress: () => console.log("No") },
              ])
            }
          />
        </View>
        <View style={styles.registerButton}>
          <Button
            title="Register"
            onPress={() =>
              Alert.prompt("My title", "My message", (text) =>
                console.log(text)
              )
            }
          />
        </View>
        <View style={styles.guestButton}>
          <Button
            title="Continue without signing up"
            onPress={() => navigation.navigate("Today")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    top: 200,
  },
  buttonWrap: {
    position: "absolute",
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    bottom: 50,
    paddingHorizontal: 15,
  },
  loginButton: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.secondary,
    backgroundColor: Colors.white,
    width: "100%",
    height: 70,
  },
  registerButton: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.secondary,
    backgroundColor: Colors.white,

    width: "100%",
    height: 70,
  },
  guestButton: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.secondary,
    backgroundColor: Colors.white,

    width: "100%",
    height: 70,
  },
});

export default WelcomeScreen;

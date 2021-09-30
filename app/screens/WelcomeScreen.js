import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Colors from "../config/Colors";
import Button from "../components/Button";
import AccountInput from "../components/AccountInput";

export default () => {
  const [isCreateMode, setCreateMode] = useState(true); //is user creating new account ; if false, user is logging in
  const [emailField, setEmailField] = useState({ text: "", errorMessage: "" });
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/appname.png")} />
      <View style={styles.content}>
        {/* Email input */}
        <AccountInput
          label="Email"
          text={emailField.text}
          onChangeText={(text) => {
            setEmailField({ text });
          }}
          errorMessage={emailField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType="email" //autocomplete for email
        />
        {/* Password input */}

        {/* password re-entry input */}
        {/*  Login toggle*/}
        {/* login /create account button */}
      </View>

      <Button
        onPress={() => {}}
        buttonStyle={styles.button}
        text={isCreateMode ? "Create Account" : "Login"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch", //stretch if u want the line to be length of whole screen
    backgroundColor: Colors.bg,
  },
  logo: {
    position: "absolute",
    alignSelf: "center",
    top: 90,
  },
  content: {
    flex: 1,
    top: 250,
  },

  button: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.secondary,
    backgroundColor: Colors.white,
    width: "80%",
    height: 70,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
});

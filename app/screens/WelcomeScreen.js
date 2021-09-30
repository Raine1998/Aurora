/**Login screen */

import React, { useState } from "react";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Colors from "../config/Colors";
import Button from "../components/Button";
import AccountInput from "../components/AccountInput";
import validator from "validator";
import { auth, firestore } from "firebase";

//validate email and password
const validateFields = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    //ensure that the password is strong with these requirements
    password: validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  };

  return isValid;
};

const CreateAccount = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      console.log("Creating user...");
      firestore().collection("users").doc(user.uid).set({}); //create new user
    });
};

const Login = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("logged in");
    });
};

export default () => {
  //is user creating new account ; if false, user is logging in
  const [isCreateMode, setCreateMode] = useState(false);

  //states for input fields
  const [emailField, setEmailField] = useState({ text: "", errorMessage: "" });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordConfirmField, setPasswordConfirmField] = useState({
    text: "",
    errorMessage: "",
  });

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
        />

        {/* Password input */}
        <AccountInput
          label="Password"
          text={passwordField.text}
          onChangeText={(text) => {
            setPasswordField({ text });
          }}
          secureTextEntry={true} //ensure the password is hidden
          errorMessage={passwordField.errorMessage}
          labelStyle={styles.label}
        />

        {/* password re-entry input --only shows when creating account*/}
        {isCreateMode && (
          <AccountInput
            label="Confirm password"
            text={passwordConfirmField.text}
            onChangeText={(text) => {
              setPasswordConfirmField({ text });
            }}
            secureTextEntry={true} //ensure the password is hidden
            errorMessage={passwordConfirmField.errorMessage}
            labelStyle={styles.label}
          />
        )}

        {/*  Login toggle - toggles between login and create account*/}
        <TouchableOpacity
          onPress={() => {
            setCreateMode(!isCreateMode);
          }}
        >
          <Text style={styles.toggleText}>
            {isCreateMode
              ? "Already have an account?"
              : "Don't have an account?"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* login /create account button */}
      <Button
        onPress={() => {
          const isValid = validateFields(emailField.text, passwordField.text);
          let isAllValid = true;

          //invalid email
          if (!isValid.email) {
            emailField.errorMessage = "Please enter a valid email";
            setEmailField({ ...emailField }); //re-renders the email text
            isAllValid = false;
          }
          //invalid password
          if (!isValid.password) {
            passwordField.errorMessage =
              "Password must be at least 8 letters long with a lowercase, uppercase, number and symbol";
            setPasswordField({ ...passwordField }); //re-renders the email text
            isAllValid = false;
          }

          //if password and confirm password dont match
          if (isCreateMode && passwordConfirmField.text != passwordField.text) {
            passwordConfirmField.errorMessage = "Passwords do not match";
            setPasswordConfirmField({ ...passwordConfirmField });
            isAllValid = false;
          }

          //if all fields are valid
          if (isAllValid) {
            isCreateMode
              ? CreateAccount(emailField.text, passwordField.text)
              : Login(emailField.text, passwordField.text);
          }
        }}
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
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  toggleText: {
    alignSelf: "center",
    color: Colors.primary,
    fontSize: 16,
    margin: 2,
  },
});

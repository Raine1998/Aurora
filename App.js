/**entry point of the program */

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

//firebase imports
import ApiKey from "./app/config/ApiKeys";
//import * as fb from "firebase";
import firebase from "firebase/app";
import "firebase/firestore";

//screen imports
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ShelfScreen from "./app/screens/ShelfScreen";
import DiaryScreen from "./app/screens/DiaryScreen";
import DiscoverScreen from "./app/screens/DiscoverScreen";
import ProfileScreen from "./app/screens/ProfileScreen";

//nav imports
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import TodayScreen from "./app/screens/TodayScreen";
import RoutineList from "./app/screens/RoutineList";
import EditRoutineListScreen from "./app/screens/EditRoutineListScreen";
import Settings from "./app/screens/Settings";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    </AuthStack.Navigator>
  );
};

const Screens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Today" component={TodayScreen} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="RoutineList"
        component={RoutineList}
        options={({ route }) => {
          return { title: route.params.title };
        }}
      />
      <Stack.Screen
        name="EditRoutineList"
        component={EditRoutineListScreen}
        options={({ route }) => {
          return {
            //if routine step doesn't exist yet,
            title: route.params.title ? route.params.title : "Create new list",
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); //is logged in

  //run
  useEffect(() => {
    //if there is a current user
    if (firebase.auth().currentUser) {
      setIsAuthenticated(true);
    }
    //if there is a change in the authentication state in the firebase
    firebase.auth().onAuthStateChanged((user) => {
      console.log("Checking auth state...");
      if (user) {
        //there is a user
        setIsAuthenticated(true);
      } else {
        //no user
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <Screens /> : <AuthScreens />}
    </NavigationContainer>

    // <NavigationContainer>
    //   <Tabs.Navigator style={styles.tab}>
    //     <Tabs.Screen name="Welcome" component={WelcomeScreen} />
    //     <Tabs.Screen name="Today2" component={TodayScreen2} />
    //     <Tabs.Screen name="Diary" component={DiaryScreen} />
    //     <Tabs.Screen name="My Shelf" component={ShelfScreen} />
    //     <Tabs.Screen name="Discover" component={DiscoverScreen} />
    //     <Tabs.Screen name="My Profile" component={ProfileScreen} />
    //     <Tabs.Screen name="MorningRoutine" component={MorningRoutineScreen} />
    //   </Tabs.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {},
});

// Initialize Firebase
if (!firebase.apps.length) {
  const app = firebase.initializeApp(ApiKey.FirebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

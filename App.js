/**entry point of the program */

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//firebase imports
import ApiKey from "./app/config/ApiKeys";
//import * as fb from "firebase";
import firebase from "firebase/app";
import "firebase/firestore";

//screen imports
import WelcomeScreen from "./app/screens/WelcomeScreen";
import TodayScreen from "./app/screens/TodayScreen";
import RoutineList from "./app/screens/RoutineList";
import EditRoutineListScreen from "./app/screens/EditRoutineNameScreen";
import Settings from "./app/screens/Settings";

import ShelfScreen from "./app/screens/ShelfScreen";
import DiaryScreen from "./app/screens/DiaryScreen";
import DiscoverScreen from "./app/screens/DiscoverScreen";
import ProfileScreen from "./app/screens/ProfileScreen";

//nav imports
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Tabs = createBottomTabNavigator(); //the bottom navs
const TodayStack = createStackNavigator(); //Today screen navs
const AuthStack = createStackNavigator(); //the login

//nav stack before authentication
const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    </AuthStack.Navigator>
  );
};

// the nav stack for the today screen
const TodayStackScreens = () => {
  return (
    <TodayStack.Navigator>
      {/* also today screen so i left the name blank */}
      <TodayStack.Screen name=" " component={TodayScreen} />
      <TodayStack.Screen name="Settings" component={Settings} />
      <TodayStack.Screen
        name="RoutineList"
        component={RoutineList}
        options={({ route }) => {
          return { title: route.params.title };
        }}
      />
      <TodayStack.Screen
        name="EditRoutineList"
        component={EditRoutineListScreen}
        options={({ route }) => {
          return {
            //if routine step doesn't exist yet,
            title: route.params.title ? route.params.title : "Create new list",
          };
        }}
      />
    </TodayStack.Navigator>
  );
};

//nav stack after authentication
const TabScreens = () => {
  return (
    <Tabs.Navigator style={styles.tab}>
      <Tabs.Screen
        name="Today"
        component={TodayStackScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Diary"
        component={DiaryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="My Shelf"
        component={ShelfScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="earth" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="My Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); //is logged in

  //checks if user is authenticated
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
      {isAuthenticated ? <TabScreens /> : <AuthScreens />}
    </NavigationContainer>
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

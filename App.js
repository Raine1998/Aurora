//entry point of the program

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ApiKey from "./app/config/ApiKeys";
import firebase from "firebase/app";
import "firebase/firestore";

//screens
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ShelfScreen from "./app/screens/ShelfScreen";
import DiaryScreen from "./app/screens/DiaryScreen";
import DiscoverScreen from "./app/screens/DiscoverScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import MorningRoutineScreen from "./app/screens/MorningRoutineScreen";

//nav imports
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import TodayScreen2 from "./app/screens/TodayScreen2";
import RoutineList from "./app/screens/RoutineList";
import EditRoutineListScreen from "./app/screens/EditRoutineList";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKey.FirebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Today2" component={TodayScreen2} />
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
            return { title: route.params.title };
          }}
        />
      </Stack.Navigator>
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

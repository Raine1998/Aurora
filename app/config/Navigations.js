import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TodayScreen2 from "../screens/TodayScreen2";
import MorningRoutineScreen from "../screens/MorningRoutineScreen";
import TodayScreen from "../screens/TodayScreen";

const TodayStack = createStackNavigator();

const TodayStackScreen = () => {
  <TodayStack.Navigator>
    <TodayStack.Screen name="TodayScreen" component={TodayScreen2} />
    <TodayStack.Screen name="MorningRoutine" component={MorningRoutineScreen} />
  </TodayStack.Navigator>;
};

export default () => {
  return (
    <NavigationContainer>
      <TodayStackScreen></TodayStackScreen>
    </NavigationContainer>
  );
};

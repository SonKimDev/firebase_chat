import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigator from "./BottomNavigator";
import ProfileScreen from "../screens/main/ProfileScreen";
import ChangeInfomationScreen from "../screens/main/ChangeInfomationScreen";
import ChangePasswordScreen from "../screens/main/ChangePasswordScreen";
import ChatRoomScreen from "../screens/main/ChatRoomScreen";
const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Bottom"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Bottom" component={BottomNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="ChangeInfomation"
        component={ChangeInfomationScreen}
      />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
}

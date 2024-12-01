import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/main/HomeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../constants/theme";
import SettingScreen from "../screens/main/SettingScreen";
import FriendScreen from "../screens/main/FriendScreen";
const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: { height: 90, paddingTop: 18 },
        tabBarLabelStyle: { marginTop: 6, fontSize: 16, fontWeight: "700" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
                color={focused ? color : colors.gray}
                size={size}
              />
            );
          },
          tabBarLabel: "Message",
        }}
      />
      <Tab.Screen
        name="Friend"
        component={FriendScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "people" : "people-outline"}
                color={focused ? color : colors.gray}
                size={size}
              />
            );
          },
          tabBarLabel: "Friends",
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                color={focused ? color : colors.gray}
                size={size}
              />
            );
          },
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/auth";
import MainNavigator from "./MainNavigator";

export default function RootNavigator() {
  const isAuth = useSelector(selectIsAuthenticated);

  return (
    <NavigationContainer>
      {isAuth ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

import React from "react";
import { Provider } from "react-redux";
import store from "./src/store/store";
import RootNavigator from "./src/navigators/RootNavigator";
import { StatusBar } from "expo-status-bar";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {
  return (
    <MenuProvider>
      <Provider store={store}>
        <StatusBar translucent backgroundColor="transparent" />
        <RootNavigator />
      </Provider>
    </MenuProvider>
  );
}

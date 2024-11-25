import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        style={{ width: "40%", height: "40%" }}
        source={require("../assets/images/loading.json")}
        autoPlay
        loop
      />
    </View>
  );
}

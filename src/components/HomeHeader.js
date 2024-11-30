import React from "react";
import { Pressable, Image, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { selectUser } from "../store/auth";

export default function HomeHeader({ title, onPress}) {
  const user = useSelector(selectUser);
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.iconButtonContainer}>
        <Ionicons name="search" size={22} color={"white"} />
      </Pressable>
      <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>
        {title}
      </Text>
      <Image
        source={
          user?.avatar
            ? {
                uri: `data:images/jpeg;base64,${user?.avatar}`,
              }
            : require("../assets/images/avatar.jpg")
        }
        style={styles.avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButtonContainer: {
    borderWidth: 0.5,
    borderRadius: 999,
    borderCurve: "continuous",
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
  },
});

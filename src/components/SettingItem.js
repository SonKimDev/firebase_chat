import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../constants/theme";
import Space from "./Space";

export default function SettingItem({ title, icon, description, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color={colors.gray} />
      </View>
      <Space width={12} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 44,
    height: 44,
    backgroundColor: "#F2F8F7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
  textContainer: {
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "black",
  },
  description: {
    fontSize: 12,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MenuOption } from "react-native-popup-menu";

export default function CustomMenuItem({ text, action, value, icon }) {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View style={styles.container}>
        <Text style={{fontSize: 16, fontWeight: 'bold',}}>{text}</Text>
        {icon}
      </View>
    </MenuOption>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

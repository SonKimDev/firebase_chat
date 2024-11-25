import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constants/theme";

export default function TextButton({ title, onPress }) {
  return (
    <View>
      <Text onPress={onPress} style={styles.text}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
});

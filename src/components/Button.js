import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { colors } from "../constants/theme";

export default function Button({ title, onPress, disable = false }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.innerContainer,
          disable && { backgroundColor: colors.lightGray },
        ]}
        onPress={onPress}
        disabled={disable}
      >
        <Text style={[styles.title, disable && { color: colors.gray }]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
  },
  innerContainer: {
    backgroundColor: colors.primary,
    borderRadius: 16,
  },
  title: {
    paddingVertical: 16,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { colors } from "../constants/theme";

export default function Input({
  name,
  title,
  isPassword,
  error,
  value,
  onChangeText,
}) {
  return (
    <View>
      <Text style={[styles.title, error && { color: "red" }]}>{title}</Text>
      <TextInput
        style={[styles.input, error && { borderBottomColor: "red" }]}
        value={value}
        secureTextEntry={isPassword ? true : false}
        onChangeText={(text) => onChangeText(name, text)}
        autoCapitalize="none"
      />
      <View style={{ height: 30 }}>
        <Text style={{ textAlign: "right", marginTop: 8, color: "red" }}>
          {error}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "700",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    fontSize: 16,
    color: "black",
    height: 44,
  },
});

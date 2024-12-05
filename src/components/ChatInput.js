import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import Space from "./Space";
import { Ionicons } from "@expo/vector-icons";

export default function ChatInput({value, onChangeText, handleSendMessage}) {
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: 24,
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <TextInput
        placeholder="Write your message"
        style={{
          borderRadius: 12,
          backgroundColor: "#F3F6F6",
          flex: 1,
          height: 40,
          paddingHorizontal: 10,
        }}
        value={value}
        onChangeText={onChangeText}
      />
      <Space width={16} />
      <TouchableOpacity onPress={handleSendMessage}>
        <Ionicons name="send" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

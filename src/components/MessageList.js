import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
});

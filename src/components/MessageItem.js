import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/auth";
import Space from "./Space";
import { formatTime } from "../utils/common";
import { colors } from "../constants/theme";

export default function MessageItem({ message }) {
  const user = useSelector(selectUser);
  const time = formatTime(message.createAt.seconds * 1000);

  return (
    <View>
      <View
        style={[
          styles.messageContainer,
          message.userId === user.userId
            ? styles.currentUserMessage
            : styles.otherUserMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.userId === user.userId
              ? styles.currentUserMessageText
              : styles.otherUserMessageText,
          ]}
        >
          {message.text}
        </Text>
      </View>
      <Space height={8} />
      <View>
        <Text
          style={
            message.userId === user.userId
              ? styles.currentUserMessageTime
              : styles.otherUserMessageTime
          }
        >
          {time}
        </Text>
      </View>
      <Space height={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 12,
    maxWidth: "70%",
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  currentUserMessage: {
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    alignSelf: "flex-end",
    backgroundColor: "#20A090",
  },
  otherUserMessage: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "#F2F7FB",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  messageText: {
    fontSize: 12,
  },
  currentUserMessageText: {
    color: "white",
  },
  otherUserMessageText: {
    color: "black",
  },
  currentUserMessageTime: {
    alignSelf: "flex-end",
    color: colors.gray,
    fontSize: 10,
  },
  otherUserMessageTime: {
    alignSelf: "center",
    color: colors.gray,
    fontSize: 10,
  },
});

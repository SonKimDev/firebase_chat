import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Space from "./Space";
import { colors } from "../constants/theme";
import { formatTime, getRoomId } from "../utils/common";
import { chatServices } from "../services/chatServices";

export default function ChatListItem({ user, navigation, currentUser }) {
  const [lastMessage, setLastMessage] = useState(undefined);

  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, user?.userId);
    const unSub = chatServices.getLastMessageRealtime(roomId, (messages) => {
      setLastMessage(messages[0] ? messages[0] : null);
    });

    return () => {
      if (typeof unSub === "function") {
        unSub();
      }
    };
  }, [user.userId]);

  function renderDeltaTime() {
    if (lastMessage) {
      return formatTime(lastMessage.createAt.seconds * 1000);
    }
  }

  function renderLastMessage() {
    if (typeof lastMessage == undefined) {
      return "Loading....";
    }
    if (lastMessage) {
      if (currentUser?.userId === lastMessage?.userId) {
        return "You: " + lastMessage?.text;
      }
      return lastMessage?.text;
    } else {
      return "Be the first to send a message.";
    }
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.push("ChatRoom", { user: user })}
      style={styles.container}
    >
      <View>
        <Image
          source={
            user?.avatar
              ? { uri: `data:image/jpeg;base64,${user?.avatar}` }
              : require("../assets/images/avatar.jpg")
          }
          style={styles.avatar}
        />
        <View
          style={{
            backgroundColor: user.isOnline ? "#0FE16D" : "#9A9E9C",
            width: 8,
            height: 8,
            borderRadius: 999,
            borderCurve: "continuous",
            position: "absolute",
            right: 6,
            bottom: 3,
          }}
        />
      </View>
      <Space width={12} />
      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "black" }}>
          {user.name}
        </Text>
        <Space height={6} />
        <Text style={{ fontSize: 12 }}>{renderLastMessage()}</Text>
      </View>
      <View
        style={{ alignItems: "flex-end", flex: 1, justifyContent: "center" }}
      >
        <Text style={styles.lastTimeMessage}>{renderDeltaTime()}</Text>
        <Space height={6} />
        <View style={styles.unSeenMessageContainer}>
          <Text style={styles.unSeenMessageContent}>4</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 999,
  },
  lastTimeMessage: {
    fontSize: 12,
    color: colors.gray,
  },
  unSeenMessageContainer: {
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: "#F04A4C",
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
  },
  unSeenMessageContent: {
    color: "white",
    fontSize: 12,
  },
});

import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Space from "./Space";

export default function ChatListItem({ user }) {
  return (
    <Pressable style={styles.container}>
      <Image
        source={
          user?.avatar
            ? { uri: `data:image/jpeg;base64,${user?.avatar}` }
            : require("../assets/images/avatar.jpg")
        }
        style={styles.avatar}
      />
      <Space width={12} />
      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "black" }}>
          {user.name}
        </Text>
        <Space height={6} />
        <Text style={{ fontSize: 12 }}>How are you today?</Text>
      </View>
      <View></View>
    </Pressable>
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
});

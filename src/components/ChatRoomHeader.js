import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Space from "./Space";
import { colors } from "../constants/theme";

export default function ChatRoomHeader({ user, navigation }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        size={24}
        color={"black"}
        name="keyboard-backspace"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Space width={12} />
      <View style={styles.avatarContainer}>
        <Image
          source={
            user?.avatar
              ? { uri: `data:images/jpeg;base64,${user.avatar}` }
              : require("../assets/images/avatar.jpg")
          }
          style={styles.avatar}
        />
        <View
          style={[
            styles.statusDot,
            { backgroundColor: user.isOnline ? "#2BEF83" : "#9A9E9C" },
          ]}
        />
      </View>
      <Space width={12} />
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <Space height={1} />
        <Text style={styles.userStatus}>
          {user.isOnline ? "Active now" : "Offline"}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={24} color={"black"} />
        </TouchableOpacity>
        <Space width={16} />
        <TouchableOpacity>
          <Ionicons name="videocam-outline" size={24} color={"black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    position: "absolute",
    right: 3,
    bottom: 2,
  },
  infoContainer: {
    justifyContent: "center",
  },
  userName: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
  },
  userStatus: {
    color: colors.gray,
    fontSize: 12,
  },
  actionsContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

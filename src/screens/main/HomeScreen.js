import { Platform, StyleSheet, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import HomeHeader from "../../components/HomeHeader";
import Space from "../../components/Space";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatListItem from "../../components/ChatListItem";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const user = useSelector(selectUser)
  return (
    <View style={[styles.container, { paddingTop: ios ? top : top + 10 }]}>
      <StatusBar style="light" />
      <Space height={17} />
      <View style={styles.header}>
        <HomeHeader title={"Home"} />
        <Space height={40} />
      </View>
      <View style={styles.body}>
        <Space height={41} />
        <ChatListItem user={user}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    paddingHorizontal: 24,
  },
  body: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
  },
});

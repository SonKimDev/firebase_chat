import { Platform, StyleSheet, View, TextInput } from "react-native";
import React from "react";
import Space from "../../components/Space";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import { Ionicons } from "@expo/vector-icons";
import ChatInput from "../../components/ChatInput";

const ios = Platform.OS == "ios";

export default function ChatRoomScreen() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  return (
    <View style={[styles.container, { paddingTop: ios ? top : top + 10 }]}>
      <StatusBar style="dark" />
      <CustomKeyboardView>
        <Space height={16} />
        <View style={styles.header}>
          <ChatRoomHeader user={user} navigation={navigation} />
        </View>
        <View style={{ flex: 1 }}></View>
        <ChatInput />
      </CustomKeyboardView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
});

import { Platform, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Space from "../../components/Space";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import ChatInput from "../../components/ChatInput";
import MessageList from "../../components/MessageList";
import { getRoomId } from "../../utils/common";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth/index";
import { chatServices } from "../../services/chatServices";
import Loading from "../../components/Loading";

const ios = Platform.OS == "ios";

export default function ChatRoomScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const me = useSelector(selectUser);

  async function handleSendMessage() {
    let message = text.trim();
    if (!message) {
      return;
    }
    let roomId = getRoomId(me?.userId, user?.userId);

    await chatServices.sendMessage(roomId, me, message);
    setText("");
  }

  async function createRoomIfNotExists() {
    let roomId = getRoomId(me?.userId, user?.userId);
    await chatServices.createChatRoomIfNotExists(roomId);
  }

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(me?.userId, user?.userId);
    const unSub = chatServices.getMessageRealtime(roomId, (messages) => {
      setMessages(messages);
      setLoading(false);
    });

    return () => {
      if (typeof unSub === "function") {
        unSub();
      }
    };
  }, [user.userId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={[styles.container, { paddingTop: ios ? top : top + 10 }]}>
      <StatusBar style="dark" />
      <Space height={16} />
      <View style={styles.header}>
        <ChatRoomHeader user={user} navigation={navigation} />
      </View>
      <CustomKeyboardView inChat={true}>
        <View style={{ flex: 1 }}>
          <MessageList messages={messages} />
        </View>
        <ChatInput
          value={text}
          onChangeText={(text) => setText(text)}
          handleSendMessage={() => handleSendMessage()}
        />
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

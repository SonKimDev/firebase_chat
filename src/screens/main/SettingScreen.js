import { Platform, StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, selectUser } from "../../store/auth";
import Space from "../../components/Space";
import { authService } from "../../services/authServices";
import SettingItem from "../../components/SettingItem";
import UserProfileItem from "../../components/UserProfileItem";
import { useNavigation } from "@react-navigation/native";

const ios = Platform.OS === "ios";

export default function SettingScreen() {
  const { top } = useSafeAreaInsets();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function logOutHandle() {
    Alert.alert(
      "Notification",
      "Do you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await authService.logout();
            dispatch(removeUser());
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={[styles.container, { paddingTop: ios ? top : top + 10 }]}>
      <Space height={19} />
      <Text style={styles.title}>Settings</Text>
      <Space height={52} />
      <View style={styles.body}>
        <Space height={41} />
        <UserProfileItem
          user={user}
          logOutHandle={() => logOutHandle()}
          navigation={navigation}
        />
        <Space height={20} />
        <View style={{ height: 1, backgroundColor: "#F5F6F6" }} />
        <View
          style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}
        >
          <Space height={30} />
          <SettingItem
            title={"My Profile"}
            description={"View your personal information"}
            icon={"heart-outline"}
            onPress={() => {
              navigation.push("Profile", { user: user, isMe: true});
            }}
          />
          <Space height={30} />
          <SettingItem
            title={"Notifications"}
            description={"Messages, group and others"}
            icon={"notifications-outline"}
            onPress={() => {
              navigation.push("Notification", { user: user });
            }}
          />
          <Space height={30} />
          <SettingItem
            title={"Help"}
            description={"Help center, contact us, privacy policy"}
            icon={"help-circle-outline"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  body: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderCurve: "continuous",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 999,
    borderCurve: "continuous",
  },
});

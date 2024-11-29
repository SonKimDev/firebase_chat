import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Space from "./Space";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import CustomMenuItem from "./CustomMenuItem";
import Divider from "./Divider";
import { colors } from "../constants/theme";

export default function UserProfileItem({ user, logOutHandle, navigation }) {
  return (
    <View style={{ flexDirection: "row", paddingHorizontal: 24 }}>
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.name}</Text>
        <Text style={{ fontSize: 12 }}>Never give up 💪</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "flex-end" }}>
          <Menu>
            <MenuTrigger>
              <Ionicons
                name="ellipsis-vertical"
                color={colors.primary}
                size={24}
              />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  width: 230,
                  borderRadius: 10,
                  borderCurve: "continuous",
                  marginLeft: -10,
                  marginTop: 15,
                },
              }}
            >
              <CustomMenuItem
                text={"Change Infomations"}
                action={() =>
                  navigation.push("ChangeInfomation", { user: user})
                }
                icon={
                  <Ionicons
                    name="information-circle-outline"
                    size={22}
                    color={"black"}
                  />
                }
              />
              <Divider />
              <CustomMenuItem
                text={"Change Password"}
                action={() => navigation.push("ChangePassword")}
                icon={<Ionicons name="key-outline" size={22} color={"black"} />}
              />
              <Divider />
              <CustomMenuItem
                text={"Log out"}
                action={() => logOutHandle()}
                icon={
                  <Ionicons name="log-out-outline" size={22} color={"black"} />
                }
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
  },
  logoutButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

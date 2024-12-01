import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import Space from "./Space";

export default function PeopleListItem({ item, navigation }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.push("Profile", { user: item })}
    >
      <Image
        source={
          item?.avatar
            ? {
                uri: `data:images/jpeg;base64,${item.avatar}`,
              }
            : require("../assets/images/avatar.jpg")
        }
        style={{ width: 80, height: 80, borderRadius: 999 }}
      />
      <Space width={12} />
      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontWeight: "700", fontSize: 20, color: "black" }}>
          {item.name}
        </Text>
        <Space height={6} />
        <Text style={{ fontSize: 12 }}>
          {item?.friends?.length ? item?.friends?.length : 0} friends
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

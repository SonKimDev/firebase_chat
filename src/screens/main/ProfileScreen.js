import { Platform, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Space from "../../components/Space";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth";
import { colors } from "../../constants/theme";
import Button from "../../components/Button";
const ios = Platform.OS === "ios";

const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const me = useSelector(selectUser);
  const [isMe, setIsMe] = useState(false);
  const [isFriend, setIsFriend] = useState(isFriend);

  useEffect(() => {
    const checkUser = () => {
      if (me.userId === user.userId) {
        setIsMe(true);
      } else {
        setIsMe(false);
      }
      const friendsList = me.friends || [];
      if (friendsList.includes(user.userId)) {
        setIsFriend(true);
      } else {
        setIsFriend(false);
      }
    };
    checkUser();
  }, [me, user]);

  return (
    <View style={[styles.container, { paddingTop: ios ? top : top + 10 }]}>
      <Space height={17} />
      <View style={{ paddingHorizontal: 24 }}>
        <MaterialCommunityIcons
          size={24}
          color={"white"}
          name="keyboard-backspace"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.infoContainer}>
          <Image
            source={
              user?.avatar
                ? { uri: user?.avatar }
                : require("../../assets/images/avatar.jpg")
            }
            style={styles.avatar}
          />
          <Space height={12} />
          <Text style={styles.infoName}>{user?.name}</Text>
        </View>
      </View>
      <Space height={24} />
      <View style={styles.bottom}>
        <Space height={41} />
        <View>
          <Text style={styles.title}>Display Name</Text>
          <Space height={10} />
          <Text style={styles.content}>{user?.name}</Text>
        </View>
        <Space height={30} />
        <View>
          <Text style={styles.title}>Email Adress</Text>
          <Space height={10} />
          <Text style={styles.content}>{user?.email}</Text>
        </View>
        <Space height={30} />
        <View>
          <Text style={styles.title}>Address</Text>
          <Space height={10} />
          <Text style={styles.content}>{user?.address}</Text>
        </View>
        <Space height={30} />
        <View>
          <Text style={styles.title}>Phone Number</Text>
          <Space height={10} />
          <Text style={styles.content}>{user?.phoneNumber}</Text>
        </View>
        <Space height={30} />
        {!isMe && !isFriend ? (
          <Button title={"Add friend"} />
        ) : !isMe && isFriend ? (
          <Button title={"remove friend"} />
        ) : null}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 999,
    borderCurve: "continuous",
  },
  infoName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  bottom: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    borderCurve: "continuous",
  },
  titleContainer: {},
  title: {
    color: colors.gray,
    fontSize: 14,
  },
  content: {
    fontSize: 18,
    color: "black",
    fontWeight: "700",
    marginLeft: 8,
  },
});

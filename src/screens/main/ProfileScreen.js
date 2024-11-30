import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Space from "../../components/Space";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateAvatar } from "../../store/auth";
import { colors } from "../../constants/theme";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { authService } from "../../services/authServices";

const ios = Platform.OS === "ios";

const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const me = useSelector(selectUser);
  const [isMe, setIsMe] = useState(false);
  const [isFriend, setIsFriend] = useState(isFriend);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  async function onPickAvatar() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setIsLoading(true);
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (base64) {
        const res = await authService.uploadAvatar(base64, me.userId);
        if (res.success) {
          setIsLoading(false);
          Alert.alert("success", "Update avatar successful");
          dispatch(updateAvatar(base64));
        }
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const checkUser = () => {
      if (me.userId === user.userId) {
        setIsMe(true);
        setAvatar(me.avatar);
      } else {
        setIsMe(false);
        setAvatar(user.avatar);
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

  return isLoading ? (
    <Loading />
  ) : (
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
          <View>
            <Image
              source={
                avatar
                  ? { uri: `data:image/jpeg;base64,${avatar}` }
                  : require("../../assets/images/avatar.jpg")
              }
              style={styles.avatar}
            />
            {isMe && (
              <TouchableOpacity
                onPress={onPickAvatar}
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "#1E90FF",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 999,
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
              >
                <Ionicons name="image" size={18} color="white" />
              </TouchableOpacity>
            )}
          </View>
          <Space height={12} />
          <Text style={styles.infoName}>{user?.name}</Text>
          <Space height={4} />
          <Text style={styles.friendsCount}>
            {user?.friends?.length > 0 ? user?.friends?.length : 0} friends
          </Text>
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
  friendsCount: {
    fontSize: 12,
    color: colors.gray,
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

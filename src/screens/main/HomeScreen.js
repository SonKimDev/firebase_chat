import { Platform, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import HomeHeader from "../../components/HomeHeader";
import Space from "../../components/Space";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatListItem from "../../components/ChatListItem";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth";
import { authService } from "../../services/authServices";
import { useNavigation } from "@react-navigation/native";
import HomeSearchBar from "../../components/HomeSearchBar";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const [friendsDetails, setFriendsDetails] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredFriends = friendsDetails.filter((friend) =>
    friend.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const { top } = useSafeAreaInsets();
  const user = useSelector(selectUser);
  const navigation = useNavigation();

  useEffect(() => {
    const getAllFriendDetails = async () => {
      const res = await authService.getFriends(user.friends);
      if (res.success) {
        setFriendsDetails(res.data);
      }
    };
    getAllFriendDetails();
  }, [user.friends]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: ios ? top : top + 10 },
        isSearch && { backgroundColor: "white" },
      ]}
    >
      <StatusBar style={isSearch ? "dark" : "light"} />
      <Space height={17} />
      {isSearch && (
        <HomeSearchBar
          filteredFriends={filteredFriends}
          searchText={searchText}
          onChangeText={setSearchText}
          navigation={navigation}
          setIsSearch={() => setIsSearch(false)}
        />
      )}
      {!isSearch && (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <HomeHeader
              title={"Home"}
              onPress={() => {
                setIsSearch(true);
                setSearchText("");
              }}
            />
            <Space height={40} />
          </View>
          <View style={styles.body}>
            <Space height={41} />
            {friendsDetails.length > 0 ? (
              <ChatListItem user={friendsDetails[0]} navigation={navigation} />
            ) : null}
          </View>
        </View>
      )}
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

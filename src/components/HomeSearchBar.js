import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Space from "./Space";
import { Ionicons } from "@expo/vector-icons";
import ChatListItem from "./ChatListItem";

export default function HomeSearchBar({
  filteredFriends,
  searchText,
  navigation,
  setIsSearch,
  onChangeText,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <TouchableOpacity
          onPress={() => {
            setIsSearch();
            Keyboard.dismiss();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Space width={12} />
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          autoFocus
          value={searchText}
          onChangeText={onChangeText}
        />
      </View>
      <Space height={20} />
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.userId.toString()}
        renderItem={({ item }) => (
          <ChatListItem user={item} navigation={navigation} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No results found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#F3F6F6",
    height: 40,
    borderRadius: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
  },
});

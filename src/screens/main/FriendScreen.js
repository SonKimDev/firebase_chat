import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Space from "../../components/Space";
import { userServices } from "../../services/userServices";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth";
import PeopleListItem from "../../components/PeopleListItem";

const ios = Platform.OS == "ios";

export default function FriendScreen() {
  const [searchText, setSearchText] = useState("");
  const [people, setPeople] = useState([]);

  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const me = useSelector(selectUser);

  const filteredPeople = people.filter((people) =>
    people.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    const result = await userServices.searchUsers(searchText);
    if (result.success) {
      setSearchResults(result.data);
    }
  };

  const clearSearch = () => {
    setSearchText("");
  };

  useEffect(() => {
    const getPeoples = async () => {
      const res = await userServices.getAllUsers(me.userId);
      if (res.success) {
        setPeople(res.data);
      } else {
        setPeople([]);
      }
    };
    getPeoples();
  }, [me.userId]);

  return (
    <View style={[styles.container, { paddingTop: ios ? top : top + 10 }]}>
      <Space height={17} />
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          {searchText ? (
            <TouchableOpacity style={styles.cancelButton} onPress={clearSearch}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <Space height={20} />
      </View>
      <View style={styles.body}>
        <Space height={41} />
        <FlatList
          data={filteredPeople}
          keyExtractor={(item) => item.userId.toString()}
          renderItem={({ item }) => (
            <PeopleListItem item={item} navigation={navigation} />
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={() =>
            !searchText ? null : (
              <Text style={styles.emptyText}>Không tìm thấy kết quả</Text>
            )
          }
          ItemSeparatorComponent={<Space height={30} />}
        />
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  cancelButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  cancelText: {
    color: "#007AFF",
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 20,
  },
});

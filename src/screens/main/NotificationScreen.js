import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { notificationServices } from "../../services/notificationServices";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Loading from "../../components/Loading";
import NotificationItem from "../../components/NotificationItem";
import { Ionicons } from "@expo/vector-icons";
import Space from "../../components/Space";

const ios = Platform.OS == "ios";

export default function NotificationScreen() {
  const route = useRoute();
  const { user } = route.params;
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  async function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    const unsubscribe = notificationServices.listenToUserNotifications(
      user.userId,
      (data) => {
        setNotifications(data);
        setLoading(false);
      }
    );

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [user.userId]);

  if (loading) {
    return <Loading />;
  }

  if (notifications.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: ios ? top : top + 10 }]}>
        <StatusBar style="dark" />
        <Space height={17} />
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size={22} color={"black"} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Notifications</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Không có thông báo nào.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: ios ? top : top + 10 }]}>
      <StatusBar style="dark" />
      <Space height={17} />
      <TouchableOpacity onPress={handleBack}>
        <Ionicons name="arrow-back-outline" size={22} color={"black"} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <NotificationItem item={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  listContent: {
    paddingVertical: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  notificationItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
  },
  notificationText: {
    fontSize: 16,
    fontWeight: "500",
  },
  notificationDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
});

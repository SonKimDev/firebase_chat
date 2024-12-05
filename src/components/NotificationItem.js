import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { userServices } from "../services/userServices";
import { friendServices } from "../services/friendServices";
import { notificationServices } from "../services/notificationServices";
import { useDispatch } from "react-redux";
import { addFriend } from "../store/auth";

export default function NotificationItem({ item }) {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const res = await userServices.getUserDetail(item.from);
      if (res.success) {
        setData(res.data);
      }
    };
    getData();
  }, [item]);

  const handleAccept = async () => {
    const res = await friendServices.acceptFriendRequest(item.to, item.from);
    if (res.success) {
      const notificationRes =
        await notificationServices.acceptFriendRequestNotification(item.id);
      dispatch(addFriend(item.to));
      if (notificationRes.success) {
        console.log("Friend request accepted");
      }
    } else {
      console.log("Failed to accept friend request");
    }
  };

  const handleReject = async () => {
    const res = await friendServices.rejectFriendRequest(item.to, item.from);
    if (res.success) {
      const notificationRes =
        await notificationServices.rejectFriendRequestNotification(item.id);
      if (notificationRes.success) {
        console.log("Friend request rejected");
      }
    } else {
      console.log("Failed to reject friend request");
    }
  };

  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Image
          source={
            data?.avatar
              ? { uri: `data:images/jpeg;base64,${data?.avatar}` }
              : require("../assets/images/avatar.jpg")
          }
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          {item.status === "acceptFriendRequest" && (
            <Text style={styles.notificationText}>
              You have accepted a friend request from{" "}
              {data.name || "Loading..."}
            </Text>
          )}

          {item.type === "friendRequest" && item.status === "pending" && (
            <Text style={styles.notificationText}>
              Friend request from {data.name || "Loading..."}
            </Text>
          )}

          {item.status === "rejectFriendRequest" && (
            <Text style={styles.notificationText}>
              You have rejected a friend request from{" "}
              {data.name || "Loading..."}
            </Text>
          )}
          <Text style={styles.notificationDate}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
      </View>

      {item.type === "friendRequest" &&
        item.status !== "acceptFriendRequest" &&
        item.status !== "rejectFriendRequest" && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => handleAccept()}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => handleReject()}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  notificationItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
    flexDirection: "column",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 999,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
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
  actionButtons: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  rejectButton: {
    backgroundColor: "#F44336",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

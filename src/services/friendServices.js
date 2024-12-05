import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { notificationServices } from "./notificationServices";

export const friendServices = {
  async getFriends(friendsIds) {
    try {
      const q = query(
        collection(firestore, "users"),
        where("userId", "in", friendsIds)
      );

      const querySnapshots = await getDocs(q);

      let data = [];
      querySnapshots.forEach((doc) => {
        data.push({ ...doc.data() });
      });

      return { success: true, data };
    } catch (error) {
      return [];
    }
  },

  async sendFriendRequest(senderId, receiverId) {
    try {
      const receiverDoc = doc(firestore, "users", receiverId);
      const receiverSnapshot = await getDoc(receiverDoc);

      if (!receiverSnapshot.exists()) {
        return { success: false, msg: "User does not exist." };
      }

      const receiverData = receiverSnapshot.data();

      if (receiverData.friendRequests?.includes(senderId)) {
        return { success: false, msg: "Request already sent." };
      }

      await updateDoc(receiverDoc, {
        friendRequests: arrayUnion(senderId),
      });

      await notificationServices.sendFriendRequest(senderId, receiverId);

      return { success: true };
    } catch (error) {
      console.error("Error sending friend request:", error);
      return { success: false, msg: error.message };
    }
  },

  async unFriend(userId, otherUserId) {
    try {
      const userDoc = doc(firestore, "users", userId);
      const otherUserDoc = doc(firestore, "users", otherUserId);

      await updateDoc(userDoc, {
        friends: arrayRemove(otherUserId),
      });

      await updateDoc(otherUserDoc, {
        friends: arrayRemove(userId),
      });

      return { success: true, msg: "Unfriend successful." };
    } catch (error) {
      console.error("Error unfriending user:", error);
      return { success: false, msg: "There is something wrong" };
    }
  },

  async acceptFriendRequest(userId, senderId) {
    try {
      const userDoc = doc(firestore, "users", userId);
      const senderDoc = doc(firestore, "users", senderId);

      await updateDoc(userDoc, {
        friends: arrayUnion(senderId),
        friendRequests: arrayRemove(senderId),
      });
      await updateDoc(senderDoc, {
        friends: arrayUnion(userId),
      });

      return { success: true };
    } catch (error) {
      console.error("Error accepting friend request:", error);
      return { success: false, msg: "There is something wrong" };
    }
  },

  async rejectFriendRequest(userId, senderId) {
    try {
      const userDoc = doc(firestore, "users", userId);

      await updateDoc(userDoc, {
        friendRequests: arrayRemove(senderId),
      });

      return { success: true };
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      return { success: false, msg: "There is something wrong" };
    }
  },

  async isFriend(userId, otherUserId) {
    try {
      const userDoc = doc(firestore, "users", userId);
      const userSnapshot = await getDoc(userDoc);

      if (
        userSnapshot.exists() &&
        userSnapshot.data().friends?.includes(otherUserId)
      ) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error checking friendship:", error);
      return { success: false };
    }
  },

  async isRequestPending(userId, otherUserId) {
    try {
      const userDoc = doc(firestore, "users", userId);
      const userSnapshot = await getDoc(userDoc);

      if (
        userSnapshot.exists() &&
        userSnapshot.data().friendRequests?.includes(otherUserId)
      ) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error checking pending request:", error);
      return { success: false };
    }
  },
};

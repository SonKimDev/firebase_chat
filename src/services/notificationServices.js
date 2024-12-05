import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

export const notificationServices = {
  async sendFriendRequest(senderId, receiverId) {
    try {
      const notificationCollection = collection(firestore, "notifications");

      await addDoc(notificationCollection, {
        type: "friendRequest",
        from: senderId,
        to: receiverId,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      console.error("Error sending friend request notification:", error);
      return { success: false, message: "Failed to send notification." };
    }
  },

  async acceptFriendRequestNotification(notificationId) {
    try {
      const notificationDoc = doc(firestore, "notifications", notificationId);
      await updateDoc(notificationDoc, {
        status: "acceptFriendRequest",
      });

      return { success: true };
    } catch (error) {
      console.error(
        "Error updating notification status to acceptFriendRequest:",
        error
      );
      return {
        success: false,
        msg: "Something went wrong",
      };
    }
  },

  async rejectFriendRequestNotification(notificationId) {
    try {
      const notificationDoc = doc(firestore, "notifications", notificationId);
      await updateDoc(notificationDoc, {
        status: "rejectFriendRequest",
      });

      return { success: true };
    } catch (error) {
      console.error(
        "Error updating notification status to rejectFriendRequest:",
        error
      );
      return {
        success: false,
        msg: "Something went wrong",
      };
    }
  },

  async getUserNotifications(userId) {
    try {
      const notificationCollection = collection(firestore, "notifications");
      const q = query(notificationCollection, where("to", "==", userId));

      const querySnapshot = await getDocs(q);

      const notifications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return notifications;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  },

  listenToUserNotifications(userId, callback) {
    const notificationCollection = collection(firestore, "notifications");
    const q = query(notificationCollection, where("to", "==", userId));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notifications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(notifications);
    });
  
    return unsubscribe;
  }
  
};

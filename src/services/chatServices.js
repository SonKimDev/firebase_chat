import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

export const chatServices = {
  async createChatRoomIfNotExists(roomId) {
    try {
      await setDoc(doc(firestore, "rooms", roomId), {
        roomId,
        createAt: Timestamp.fromDate(new Date()),
      });

      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  },

  async sendMessage(roomId, user, message) {
    try {
      const docRef = doc(firestore, "rooms", roomId);
      const messageRef = collection(docRef, "messages");

      await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        senderName: user?.name,
        createAt: Timestamp.fromDate(new Date()),
      });

      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  },

  async getMessageRealtime(roomId, callback) {
    if (!roomId) {
      return { success: false, msg: "Room ID is required." };
    }

    try {
      const docRef = doc(firestore, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      const q = query(messageRef, orderBy("createAt", "asc"));
      const unSub = onSnapshot(
        q,
        (snapshot) => {
          const allMessages = snapshot.docs.map((doc) => doc.data());
          callback(allMessages);
        },
        (error) => {
          console.error("Error listening to messages:", error.message);
          callback([]);
        }
      );

      return unSub;
    } catch (error) {
      return { success: false, msg: error.message };
    }
  },

  async getLastMessageRealtime(roomId, callback) {
    if (!roomId) {
      return { success: false, msg: "Room ID is required." };
    }

    try {
      const docRef = doc(firestore, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      const q = query(messageRef, orderBy("createAt", "desc"));
      const unSub = onSnapshot(
        q,
        (snapshot) => {
          const allMessages = snapshot.docs.map((doc) => doc.data());
          callback(allMessages);
        },
        (error) => {
          console.error("Error listening to messages:", error.message);
          callback([]);
        }
      );

      return unSub;
    } catch (error) {
      return { success: false, msg: error.message };
    }
  },
};

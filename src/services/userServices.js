import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

export const userServices = {
  async getAllUsers(userId) {
    try {
      const q = query(
        collection(firestore, "users"),
        where("userId", "!=", userId)
      );

      const querySnapshots = await getDocs(q);

      const data = querySnapshots.docs.map((doc) => ({
        ...doc.data(),
      }));

      return { success: true, data };
    } catch (error) {
      return [];
    }
  },
  async getUserDetail(userId) {
    try {
      const docRef = doc(firestore, "users", userId);

      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return { success: false, message: "User not found" };
      }

      const data = docSnapshot.data();

      return { success: true, data };
    } catch (error) {
      console.error("Error fetching user details:", error);
      return { success: false, message: "Error fetching user details" };
    }
  },
};

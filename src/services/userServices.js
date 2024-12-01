import { collection, getDocs, query, where } from "firebase/firestore";
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
};

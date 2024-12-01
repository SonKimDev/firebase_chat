import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

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
};

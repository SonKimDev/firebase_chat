import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const authService = {
  async register(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await setDoc(doc(firestore, "users", userCredential?.user?.uid), {
          email: email,
          name: name,
          userId: userCredential?.user?.uid,
          createAt: new Date().toISOString(),
        });
      }
      return { success: true, msg: "Create your account successful" };
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid email";
      } else if (msg.includes("(auth/email-already-in-use)")) {
        msg = "Email is already in use";
      }
      return { success: false, msg };
    }
  },

  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        const userDoc = await getDoc(
          doc(firestore, "users", userCredential.user.uid)
        );
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const user = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userData.name,
            createAt: userData.createAt,
          };
          return { success: true, user };
        } else {
          return { success: false, msg: "No such user in Firestore!" };
        }
      }
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-credential)")) {
        msg = "Invalid credential";
      }
      return { success: false, msg };
    }
  },

  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      return { success: false, msg: error.message };
    }
  }
};

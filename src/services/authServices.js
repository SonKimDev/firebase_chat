import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, firestore, storage } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
  },

  async updateInfomation(userId, data) {
    try {
      await updateDoc(doc(firestore, "users", userId), {
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        avatar: data.avatar,
      });
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  },

  async reauthenticateAndChangePassword(email, currentPassword, newPassword) {
    const user = auth.currentUser;

    if (!user) {
      return { success: false, msg: "No user is signed in" };
    }

    try {
      const credential = signInWithEmailAndPassword(
        auth,
        email,
        currentPassword
      );
      await credential;

      await updatePassword(user, newPassword);
      return { success: true, msg: "Password updated successfully" };
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        return { success: false, msg: "Current password is incorrect" };
      } else if (error.code === "auth/user-not-found") {
        return { success: false, msg: "User not found" };
      }
      return { success: false, msg: error.message };
    }
  },

  async uploadAvatar(avatar, userId) {
    try {
      await updateDoc(doc(firestore, "users", userId), {
        avatar: avatar,
      });
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  },
};

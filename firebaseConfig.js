import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD-fAfVvpHWQuTM6ckJK87AgSkVhMInciE",
  authDomain: "fir-chat-b7241.firebaseapp.com",
  projectId: "fir-chat-b7241",
  storageBucket: "fir-chat-b7241.firebasestorage.app",
  messagingSenderId: "161348818627",
  appId: "1:161348818627:web:d1b285adce85b627d17476"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const firestore = getFirestore(app);
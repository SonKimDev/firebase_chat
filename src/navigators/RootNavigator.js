import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, setUser } from "../store/auth";
import MainNavigator from "./MainNavigator";
import { auth, firestore } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../components/Loading";
import { View } from "react-native";

export default function RootNavigator() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const uid = user.uid;
          const userDocRef = doc(firestore, "users", uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsLoading(false);
            dispatch(setUser(userData));
          } else {
            console.log("No user data found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setIsLoading(false);
        dispatch(clearUser());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return isLoading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {isAuth ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

import { StyleSheet, View } from "react-native";
import React from "react";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../store/auth";
import { authService } from "../../services/authServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function HomeScreen() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <View>
      <Button
        title="Sign out"
        onPress={async () => {
          await authService.logout().then(await AsyncStorage.clear());
          dispatch(logout());
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

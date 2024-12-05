import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Space from "../../components/Space";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { authService } from "../../services/authServices";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth";

const ios = Platform.OS == "ios";

export default function ChangePasswordScreen() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    errors: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  function handleChange(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "" },
    }));
  }

  async function submit() {
    let errors = {};

    if (!form.currentPassword.trim()) {
      errors.currentPassword = "Current password is required";
    } else if (form.currentPassword.trim().length < 6) {
      errors.currentPassword = "Current password must be at least 6 characters";
    }

    if (!form.newPassword.trim()) {
      errors.newPassword = "New password is required";
    } else if (form.newPassword.trim().length < 6) {
      errors.newPassword = "New password must be at least 6 characters";
    }

    if (!form.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm new password is required";
    } else if (form.confirmPassword.trim() !== form.newPassword.trim()) {
      errors.confirmPassword = "Confirm password is not correct";
    }

    if (Object.keys(errors).length > 0) {
      setForm((prev) => ({ ...prev, errors }));
    } else {
      setIsLoading(true);
      const res = await authService.reauthenticateAndChangePassword(
        user.email,
        form.currentPassword,
        form.newPassword
      );
      if (res.success) {
        setIsLoading(false);
        Alert.alert("Success", res.msg, [
          {
            text: "ok",
            onPress: async () => {
              await authService.logout();
            },
          },
        ]);
      } else {
        setIsLoading(false);
        Alert.alert("Fail", res.msg);
      }
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <View style={[styles.container, { paddingTop: ios ? top : top + 10 }]}>
      <StatusBar style="dark" />
      <CustomKeyboardView>
        <Space height={16} />
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons
            size={24}
            color={"black"}
            name="keyboard-backspace"
          />
        </TouchableOpacity>
        <Space height={60} />
        <Text style={styles.title}>Change your Password</Text>
        <Space height={30} />
        <Input
          title={"Current password"}
          name={"currentPassword"}
          value={form.currentPassword}
          onChangeText={handleChange}
          error={form.errors.currentPassword}
          isPassword={true}
        />
        <Space height={30} />
        <Input
          title={"New password"}
          name={"newPassword"}
          value={form.newPassword}
          onChangeText={handleChange}
          error={form.errors.newPassword}
          isPassword={true}
        />
        <Space height={30} />
        <Input
          title={"Confirm new password"}
          name={"confirmPassword"}
          value={form.confirmPassword}
          onChangeText={handleChange}
          error={form.errors.confirmPassword}
          isPassword={true}
        />
        <View style={{ flex: 1 }} />
        <Button
          title={"Update"}
          disable={
            !form.currentPassword || !form.newPassword || !form.confirmPassword
          }
          onPress={() => submit()}
        />
        <Space height={40} />
      </CustomKeyboardView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});

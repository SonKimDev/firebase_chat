import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/theme";
import Space from "../../components/Space";
import Input from "../../components/Input";
import TextButton from "../../components/TextButton";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../store/auth";
import { authService } from "../../services/authServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleChange(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "" },
    }));
  }

  async function validateForm() {
    let errors = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = !form.email
        ? "Email is required"
        : "Invalid email address";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(errors).length > 0) {
      setForm((prev) => ({ ...prev, errors }));
    } else {
      setIsLoading(true);
      const res = await authService.signIn(form.email, form.password);
      if (res.success) {
        await AsyncStorage.setItem("user", JSON.stringify(res.user));
        dispatch(setUser(res.user));
        setIsLoading(false);
      } else {
        Alert.alert("Login Error", res.msg);
      }
      setIsLoading(false);
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <SafeAreaView style={styles.container}>
      <CustomKeyboardView>
        <Space height={101} />
        <Text style={styles.title}>Login to Chat</Text>
        <Space height={16} />
        <Text style={styles.subTitle}>
          {
            "Welcome back! Sign in using your social\naccount or email to continue us"
          }
        </Text>
        <Space height={30} />
        <Input
          name={"email"}
          title={"Your email"}
          onChangeText={handleChange}
          value={form.email}
          error={form.errors.email}
        />
        <Input
          name={"password"}
          title={"Password"}
          onChangeText={handleChange}
          isPassword={true}
          value={form.password}
          error={form.errors.password}
        />
        <View style={{ flex: 1 }} />
      </CustomKeyboardView>
      <Button
        title={"Log in"}
        disable={!form.email || !form.password}
        onPress={() => validateForm()}
        isLoading={isLoading}
      />
      <Space height={16} />
      <TextButton
        title={"Don't have an account?"}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      />
      <Space height={37} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.primary,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
  },
});

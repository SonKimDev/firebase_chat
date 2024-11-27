import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Space from "../../components/Space";
import { colors } from "../../constants/theme";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { authService } from "../../services/authServices";

export default function SignUpScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  function handleChange(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "" },
    }));
  }

  async function validateForm() {
    let errors = {};

    // Kiểm tra các lỗi trong form
    if (!form.name) {
      errors.name = "Name is required";
    } else if (form.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

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

    if (!form.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Confirm password is not correct";
    }
    if (Object.keys(errors).length > 0) {
      setForm((prev) => ({ ...prev, errors }));
    } else {
      setIsLoading(true);
      try {
        const res = await authService.register(
          form.name,
          form.email,
          form.password
        );
        if (res.success) {
          Alert.alert("Congratulation!", res.msg);
          navigation.goBack();
        } else {
          Alert.alert("Warning!", res.msg);
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred during registration.");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <SafeAreaView style={styles.container}>
      <CustomKeyboardView>
        <Space height={17} />
        <MaterialCommunityIcons
          size={24}
          color={"black"}
          name="keyboard-backspace"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Space height={60} />
        <Text style={styles.title}>Sign up with Email</Text>
        <Space height={16} />
        <Text style={styles.subTitle}>
          {
            "Get chatting with friends and family today by\nsigning up for our chat app!"
          }
        </Text>
        <Space height={30} />
        <Input
          name={"name"}
          title={"Your name"}
          onChangeText={handleChange}
          value={form.name}
          error={form.errors.name}
        />
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
        <Input
          name={"confirmPassword"}
          title={"Confirm password"}
          onChangeText={handleChange}
          isPassword={true}
          value={form.confirmPassword}
          error={form.errors.confirmPassword}
        />
        <View style={{ flex: 1 }} />
      </CustomKeyboardView>
      <Button
        title={"Create an account"}
        disable={
          !form.name || !form.email || !form.password || !form.confirmPassword
        }
        onPress={() => validateForm()}
      />
      <Space height={40} />
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

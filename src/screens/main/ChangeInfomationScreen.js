import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Space from "../../components/Space";
import Input from "../../components/Input";
import Button from "../../components/Button";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { authService } from "../../services/authServices";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/auth";
import Loading from "../../components/Loading";

const ios = Platform.OS == "ios";

export default function ChangeInfomationScreen() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    avatar: "",
    errors: {
      name: "",
      address: "",
      phoneNumber: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const { top } = useSafeAreaInsets();
  const route = useRoute();
  const { user } = route.params;
  const dispatch = useDispatch();

  const navigation = useNavigation();

  function handleChange(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "" },
    }));
  }

  async function submit() {
    let errors = {};

    if (!form.name) {
      errors.name = "Name is required";
    } else if (form.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!form.address) {
      errors.address = "Address is required";
    }

    if (!form.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (form.phoneNumber.length < 10) {
      errors.phoneNumber = "Phone number must be at least 10 characters";
    }

    if (!form.avatar) {
      errors.phoneNumber = "Phone number is required";
    }

    if (Object.keys(errors).length > 0) {
      setForm((prev) => ({ ...prev, errors }));
    } else {
      const data = {
        name: form.name,
        address: form.address,
        phoneNumber: form.phoneNumber,
        avatar: form.avatar,
      };
      setIsLoading(true);
      const res = await authService.updateInfomation(user.userId, data);
      if (res.success) {
        setIsLoading(false);
        Alert.alert("Success", "Update infomation successful");
        dispatch(updateUser(data));
        navigation.goBack();
      } else {
        setIsLoading(false);
        Alert.alert("Fail", res.msg);
      }
    }
  }

  useEffect(() => {
    const getUser = () => {
      setForm((prev) => ({
        ...prev,
        name: user.name,
        address: user.address || "",
        phoneNumber: user.phoneNumber || "",
        avatar: user.avatar || "",
      }));
    };
    getUser();
  }, []);

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
        <Text style={styles.title}>Change your Infomations</Text>
        <Space height={30} />
        <Input
          title={"Your name"}
          name={"name"}
          value={form.name}
          error={form.errors.name}
          onChangeText={handleChange}
        />
        <Space height={30} />
        <Input
          title={"Your address"}
          name={"address"}
          value={form.address}
          error={form.errors.address}
          onChangeText={handleChange}
        />
        <Space height={30} />
        <Input
          title={"Your phone number"}
          name={"phoneNumber"}
          value={form.phoneNumber}
          error={form.errors.phoneNumber}
          onChangeText={handleChange}
        />
        <View style={{ flex: 1 }} />
        <Button
          title={"Update"}
          disable={!form.name || !form.address || !form.phoneNumber}
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

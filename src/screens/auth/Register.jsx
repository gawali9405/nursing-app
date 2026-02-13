import React, { useState } from "react";
import {
  Alert,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Loader from "../../components/common/Loader";
import { supabase } from "../../services/supabaseClient";

export default function Register({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      return Alert.alert("Error", "Please fill all fields");
    }

    if (password.length < 6) {
      return Alert.alert("Error", "Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        return Alert.alert("Registration Error", error.message);
      }

      Alert.alert(
        "Success 🎉",
        "Account created! Please check your email to confirm your account."
      );

      navigation.replace("Login");
    } catch (err) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center">

            {/* Logo */}
            <View className="items-center mb-6">
              <Image
                source={require("../../assets/images/icon.png")}
                className="w-36 h-36"
                resizeMode="contain"
              />
            </View>

            <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
              Create Account
            </Text>

            {/* Name */}
            <View className="mb-5">
              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
                <AntDesign name="user" size={20} color="gray" />
                <TextInput
                  placeholder="Full Name"
                  value={form.name}
                  onChangeText={(text) =>
                    setForm({ ...form, name: text })
                  }
                  className="flex-1 ml-3 text-base"
                  autoCompleteType="name"
                  autoComplete="name"
                />
              </View>
            </View>

            {/* Email */}
            <View className="mb-5">
              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
                <AntDesign name="mail" size={20} color="gray" />
                <TextInput
                  placeholder="Email"
                  value={form.email}
                  onChangeText={(text) =>
                    setForm({ ...form, email: text })
                  }
                  className="flex-1 ml-3 text-base"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  autoCompleteType="email"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password */}
            <View className="mb-4">
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-2">
                <Feather name="lock" size={20} color="gray" />
                <TextInput
                  placeholder="Password"
                  value={form.password}
                  onChangeText={(text) =>
                    setForm({ ...form, password: text })
                  }
                  secureTextEntry={secure}
                  className="flex-1 ml-3 text-base"
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <Feather
                    name={secure ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View className="mb-6">
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-2">
                <Feather name="lock" size={20} color="gray" />
                <TextInput
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChangeText={(text) =>
                    setForm({ ...form, confirmPassword: text })
                  }
                  secureTextEntry={secureConfirm}
                  className="flex-1 ml-3 text-base"
                />
                <TouchableOpacity
                  onPress={() => setSecureConfirm(!secureConfirm)}
                >
                  <Feather
                    name={secureConfirm ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              className="mb-5 rounded-full overflow-hidden"
            >
              <LinearGradient
                colors={["#2563EB", "#1E40AF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-4 items-center rounded-full"
              >
                <Text className="text-white font-semibold text-lg">
                  {loading ? "Creating..." : "Register"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Login Link */}
            <View className="flex-row justify-center">
              <Text className="text-gray-600">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
              >
                <Text className="text-blue-600 font-semibold">
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            {loading && <Loader message="Creating account..." />}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
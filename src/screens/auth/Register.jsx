import React, { useState } from "react";
import {
  Alert,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/common/Input";
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
          data: { full_name: name },
        },
      });

      if (error) return Alert.alert("Registration Error", error.message);

      Alert.alert(
        "Success 🎉",
        "Account created! Please check your email to confirm your account."
      );
      navigation.replace("Login");
    } catch {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            {/* Logo */}
            <View style={{ alignItems: "center", marginBottom: 24 }}>
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 144, height: 144 }}
                resizeMode="contain"
              />
            </View>

            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
                color: "#1F2937",
                marginBottom: 24,
              }}
            >
              Create Account
            </Text>

            {/* Name */}
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
              icon={<AntDesign name="user" size={20} color="gray" />}
            />

            {/* Email */}
            <Input
              label="Email"
              placeholder="Enter your email"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              icon={<AntDesign name="mail" size={20} color="gray" />}
            />

            {/* Password */}
            <Input
              label="Password"
              placeholder="Enter your password"
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
              secureTextEntry={secure}
              icon={
                <Feather
                  name={secure ? "eye-off" : "eye"}
                  size={20}
                  color="gray"
                />
              }
              onIconPress={() => setSecure(!secure)}
            />

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChangeText={(text) =>
                setForm({ ...form, confirmPassword: text })
              }
              secureTextEntry={secureConfirm}
              icon={
                <Feather
                  name={secureConfirm ? "eye-off" : "eye"}
                  size={20}
                  color="gray"
                />
              }
              onIconPress={() => setSecureConfirm(!secureConfirm)}
            />

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              style={{ marginBottom: 14, borderRadius: 25, overflow: "hidden" }}
            >
              <LinearGradient
                colors={["#2563EB", "#1E40AF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingVertical: 14,
                  alignItems: "center",
                  borderRadius: 25,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                >
                  {loading ? "Creating..." : "Register"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ color: "#6B7280", fontSize: 16 }}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    color: "#2563EB",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
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
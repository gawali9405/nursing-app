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
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Loader from "../../components/common/Loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { supabase } from "../../services/supabaseClient";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please enter email and password");
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Logged in successfully");
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Login Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingVertical: 30,
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            {/* Logo */}
            <View className="items-center mb-6">
              <Image
                source={require("../../assets/images/icon.png")}
                className="w-36 h-36"
                resizeMode="contain"
              />
            </View>

            {/* Title */}
            <Text className="text-3xl font-bold text-center text-gray-800 mb-10">
              Welcome to NPath
            </Text>

            {/* Email Input */}
            <View className="mb-5">
              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-1">
                <AntDesign name="mail" size={20} color="gray" />
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  className="flex-1 ml-3 text-base"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-1">
                <Feather name="lock" size={20} color="gray" />
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secure}
                  className="flex-1 ml-3 text-base"
                  returnKeyType="done"
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

            {/* Gradient Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              className="mb-5 rounded-full overflow-hidden"
            >
              <LinearGradient
                colors={["#2563EB", "#1E40AF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-4 items-center rounded-full"
              >
                <Text className="text-white font-semibold text-lg">
                  Login
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity className="mb-6">
              <Text className="text-center text-blue-600 font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Google Button */}
            <TouchableOpacity
              className="bg-white py-4 rounded-xl w-full flex-row items-center justify-center border border-gray-200 mb-8 shadow-sm"
            >
              <Image
                source={require("../../assets/images/google.png")}
                style={{ width: 22, height: 22 }}
                resizeMode="contain"
              />
              <Text className="text-gray-800 font-semibold text-lg ml-3">
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Sign Up */}
            <View className="flex-row justify-center">
              <Text className="text-gray-600">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
              >
                <Text className="text-blue-600 font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {loading && <Loader message="Logging in..." />}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

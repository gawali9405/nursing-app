import React, { useState, useContext } from "react";
import {
  Alert,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Loader from "../../components/common/Loader";
import Input from "../../components/common/Input";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const { signIn, loading } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please enter email and password");
    }
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            {/* Logo */}
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Title */}
            <Text style={styles.title}>Welcome to NPath</Text>

            {/* Email Input */}
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              icon={<AntDesign name="mail" size={20} color="gray" />}
            />

            {/* Password Input */}
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
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

            {/* Login Button */}
            <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
              <LinearGradient
                colors={["#2563EB", "#1E40AF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                <Text style={styles.loginText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Sign Up */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {loading && <Loader message="Logging in..." />}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 30 },
  inner: { flex: 1, justifyContent: "center" },
  logo: { width: 144, height: 144, alignSelf: "center", marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  loginBtn: { marginBottom: 16, borderRadius: 25, overflow: "hidden" },
  gradient: { paddingVertical: 14, alignItems: "center", borderRadius: 25 },
  loginText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  signUpContainer: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  signUpText: { color: "#6B7280", fontSize: 16 },
  signUpLink: { color: "#2563EB", fontSize: 16, fontWeight: "600" },
});
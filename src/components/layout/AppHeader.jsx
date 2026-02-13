 

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppHeader({
  title = "NPath",
  lightTheme = true,
  onMenuPress,
  onNotificationPress,
  extraTopPadding = 10,
}) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={lightTheme ? ["#f0f4f8", "#ffffff"] : ["#1E1E1E", "#2A2A2A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ paddingTop: insets.top + extraTopPadding, paddingBottom: 12, paddingHorizontal: 16 }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu-outline" size={28} color={lightTheme ? "#111827" : "#fff"} />
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontWeight: "bold", color: lightTheme ? "#111827" : "#fff" }}>
          {title}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity onPress={onNotificationPress}>
            <Ionicons name="notifications-outline" size={26} color={lightTheme ? "#111827" : "#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

 
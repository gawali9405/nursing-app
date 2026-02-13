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
  extraTopPadding = 10, // <-- new prop for extra top padding
}) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={lightTheme ? ["#f0f4f8", "#ffffff"] : ["#1E1E1E", "#2A2A2A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="px-4 py-3 shadow"
      style={{ paddingTop: insets.top + extraTopPadding }}  
    >
      <View className="flex-row items-center justify-between">
        {/* Menu Button */}
        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons
            name="menu-outline"
            size={28}
            color={lightTheme ? "#111827" : "#fff"}
          />
        </TouchableOpacity>

        {/* Title */}
        <Text
          className={`text-lg font-bold ${
            lightTheme ? "text-gray-800" : "text-white"
          }`}
        >
          {title}
        </Text>

        {/* Notification Button */}
        <TouchableOpacity onPress={onNotificationPress}>
          <Ionicons
            name="notifications-outline"
            size={28}
            color={lightTheme ? "#111827" : "#fff"}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
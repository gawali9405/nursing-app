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
    <View style={{
      backgroundColor: '#5250C4',
      paddingTop: insets.top + extraTopPadding,
      paddingBottom: 14,
      paddingHorizontal: 16,
      zIndex: 1,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    }}>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu-outline" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={{
          fontSize: 18,
          fontWeight: "600",
          color: "#fff"
        }}>
          {title}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity onPress={onNotificationPress}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
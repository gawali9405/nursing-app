import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

export default function Loader({ message = "Loading...", lightTheme = true }) {
  return (
    <View
      className={`absolute inset-0 z-50 flex-1 justify-center items-center ${
        lightTheme ? "bg-white" : "bg-gray-900"
      }`}
    >
      <ActivityIndicator size="large" color={lightTheme ? "#007AFF" : "#22c55e"} />
      {message && (
        <Text className={`mt-4 font-semibold ${lightTheme ? "text-gray-800" : "text-green-500"}`}>
          {message}
        </Text>
      )}
    </View>
  );
}
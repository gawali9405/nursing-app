import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

export default function Loader({
  size = "large",
  color = "#22c55e",
  message = "Loading...",
}) {
  return (
    <View className="absolute inset-0 z-50 bg-white flex-1 justify-center items-center">
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text className="mt-4 text-green-600 font-semibold">{message}</Text>
      )}
    </View>
  );
}
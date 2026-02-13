import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Button({
  title,
  onPress,
  className = "",
  textClassName = "",
  disabled = false,
}) {
  return (
    <TouchableOpacity
      className={`w-full py-3 rounded-lg items-center justify-center ${
        disabled ? "opacity-50" : ""
      } ${className}`}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text className={`text-white font-semibold ${textClassName}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
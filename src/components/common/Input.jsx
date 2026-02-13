import React from "react";
import { TextInput, View, Text } from "react-native";

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  className = "border border-gray-300 rounded-md p-3 bg-white",
  labelClassName = "text-gray-700 mb-1",
  secureTextEntry = false,
}) {
  return (
    <View className="mb-4 w-full">
      {label && <Text className={labelClassName}>{label}</Text>}
      <TextInput
        className={className}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
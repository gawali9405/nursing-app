import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  icon,           
  onIconPress,    
  containerStyle = {},
  inputStyle = {},
  labelStyle = {},
}) {
  return (
    <View style={[{ marginBottom: 12, width: "100%" }, containerStyle]}>
      {label && <Text style={[{ color: "#374151", marginBottom: 2 }, labelStyle]}>{label}</Text>}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#D1D5DB",
          borderRadius: 10,
          backgroundColor: "#fff",
          paddingHorizontal: 8,   
          paddingVertical: 6,    
        }}
      >
        {icon && (
          <TouchableOpacity onPress={onIconPress} style={{ marginRight: 6 }}>
            {icon}
          </TouchableOpacity>
        )}
        <TextInput
          style={[{ flex: 1, fontSize: 15 }, inputStyle]} 
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          keyboardType={placeholder.toLowerCase().includes("email") ? "email-address" : "default"}
          returnKeyType="next"
        />
      </View>
    </View>
  );
}
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import ScreenWrapper from "../../components/layout/ScreenWrapper";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [welcome, setWelcome] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setWelcome("Welcome to NPath!");
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <ScreenWrapper title="Home" loading={loading} lightTheme>
      <View className="mt-4">
        <Text className="text-gray-800 text-lg font-semibold">{welcome}</Text>

        <View className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
          <Text className="text-gray-800 font-medium text-base">
            Start your first test series today!
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../common/Loader";

export default function ScreenWrapper({ loading = false, children, lightTheme = true }) {
  if (loading) return <Loader message="Loading..." lightTheme={lightTheme} />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
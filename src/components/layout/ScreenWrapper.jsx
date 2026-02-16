 import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../common/Loader";

export default function ScreenWrapper({ 
  loading = false, 
  children, 
  lightTheme = true, 
  scrollable = true,
  contentContainerStyle = {} 
}) {
  if (loading) return <Loader message="Loading..." lightTheme={lightTheme} />;

  const content = (
    <View 
      style={[
        !scrollable && { 
          flex: 1,
          paddingHorizontal: 16,
          paddingBottom: 16,
        },
        contentContainerStyle
      ]}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView 
      className={`flex-1 ${lightTheme ? "bg-white" : "bg-gray-900"}`}
      style={{ flex: 1 }}
      edges={['right', 'bottom', 'left']}
    >
      {scrollable ? (
        <ScrollView
          contentContainerStyle={{ 
            paddingTop: 0,
            paddingHorizontal: 16,
            paddingBottom: 100,
            ...contentContainerStyle
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
        >
          {children}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}
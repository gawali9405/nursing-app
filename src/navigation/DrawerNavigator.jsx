// src/navigation/DrawerNavigator.jsx
import React, { useContext } from "react";
import { View, Text, Pressable, Image, ScrollView, Alert, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import BottomTabs from "./BottomTabs";
import { drawerItems, logoutItem } from "../assets/icons/drawerData";
import { AuthContext } from "../contexts/AuthContext";

const Drawer = createDrawerNavigator();

// -----------------------------
// Drawer Item Component
// -----------------------------
const DrawerItem = ({ label, icon, onPress, isActive, isNew }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 8,
      borderRadius: 8,
      backgroundColor: isActive ? "#EEF2FF" : "#F9FAFB",
      opacity: pressed ? 0.7 : 1,
    })}
    android_ripple={{ color: "#E5E7EB" }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {React.cloneElement(icon, { size: 28, style: { marginRight: 12, color: "#6B7280" } })}
        <Text style={{ fontSize: 19, color: "#6B7280", fontWeight: "400" }}>{label}</Text>
      </View>
      {isNew && (
        <View style={{ backgroundColor: "#5250C4", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 }}>
          <Text style={{ color: "white", fontSize: 12, fontWeight: "500" }}>NEW</Text>
        </View>
      )}
    </View>
  </Pressable>
);

// -----------------------------
// Custom Drawer Content
// -----------------------------
const CustomDrawerContent = ({ navigation, state }) => {
  const { signOut } = useContext(AuthContext);

  const activeRoute =
    state?.routes[state?.index]?.state?.routes?.[state?.routes[state?.index]?.state?.index]?.name;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      {/* Profile Section */}
      <View
        style={{
          alignItems: "center",
          paddingVertical: 32,
          borderBottomWidth: 1,
          marginBottom: 10,
          borderBottomColor: "#E5E7EB",
        }}
      >
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 5 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#5250C4", marginBottom: 4 }}>
          👦 Vijya cha Mal 👧
        </Text>
        <Text style={{ fontSize: 14, color: "#6B7280" }}>vijyachamal@example.com</Text>
      </View>

      {/* Drawer Items */}
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {drawerItems.map((item) => (
          <DrawerItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            onPress={() => {
              navigation.navigate("Main", { screen: item.screen });
              navigation.closeDrawer();
            }}
            isActive={activeRoute === item.screen}
            isNew={item.isNew}
          />
        ))}

        {/* WhatsApp Share Button */}
        <Pressable
          onPress={() => {
            const message = "🚀 Check out this amazing Nursing Test Series App! 📚✨";
            const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
            Linking.openURL(url).catch(() => {
              Alert.alert("Error", "WhatsApp is not installed on your device");
            });
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            borderRadius: 25,
            backgroundColor: "#25D366",
            marginVertical: 8,
            marginHorizontal: 16,
          }}
        >
          <Ionicons name="logo-whatsapp" size={24} color="white" style={{ marginRight: 12 }} />
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>Share with WhatsApp</Text>
        </Pressable>
      </ScrollView>

      {/* Logout Button */}
      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: "#E5E7EB" }}>
        <Pressable
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                  try {
                    await signOut();
                    // No need to navigate manually if your root checks `user`
                  } catch (error) {
                    Alert.alert("Error", error.message);
                  }
                },
              },
            ]);
          }}
          style={({ pressed }) => ({
            padding: 12,
            borderRadius: 8,
            backgroundColor: pressed ? "#FEE2E2" : "transparent",
          })}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {React.cloneElement(logoutItem.icon, { size: 26, color: "#EF4444" })}
            <Text
              style={{
                marginLeft: 12,
                color: "#EF4444",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              {logoutItem.label}
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

// -----------------------------
// Drawer Navigator
// -----------------------------
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: { width: "80%", backgroundColor: "#F9FAFB" },
        overlayColor: "rgba(0,0,0,0.5)",
        sceneContainerStyle: { backgroundColor: "#F9FAFB" },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Main"
        component={BottomTabs}
        options={{ drawerLabel: () => null, title: null, drawerItemStyle: { display: "none" } }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
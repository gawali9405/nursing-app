import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NOTIFICATIONS } from "../../constants/notifications";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const navigation = useNavigation();

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={26} color="#555" />
        </TouchableOpacity>
        <Text style={styles.heading}>Notifications</Text>
      </View>

      {/* Notifications List */}
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 , paddingTop: 10}}
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notificationItem, item.read && styles.readNotification]}
            onPress={() => markAsRead(item.id)}
          >
            <View style={styles.notificationRow}>
              <Ionicons
                name={item.icon || "notifications-outline"}
                size={24}
                color={item.read ? "#777" : "#555"} // slightly gray for unread
                style={{ marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={item.read ? styles.readText : styles.unreadText}>
                  {item.title}
                </Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  backButton: { marginRight: 16 },
  heading: { fontSize: 22, fontWeight: "bold", color: "#444" }, // light black text
  notificationItem: {
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: "#f9f9f9", // light background
    borderRadius: 8,
  },
  readNotification: {
    backgroundColor: "#eaeaea", // slightly darker for read
  },
  notificationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  unreadText: {
    fontWeight: "bold",
    color: "#111", // light black text
    fontSize: 16,
  },
  readText: {
    fontWeight: "normal",
    color: "#555", // slightly gray for read
    fontSize: 16,
  },
  dateText: {
    fontSize: 12,
    color: "#777", // subtle gray for date
    marginTop: 2,
  },
});
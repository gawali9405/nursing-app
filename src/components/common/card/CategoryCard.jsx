import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

export default function CategoryCard({
  title,
  icon,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "30%", // 3 items per row
    alignItems: "center",
    marginBottom: 25,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    width: 45,
    height: 45,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
});
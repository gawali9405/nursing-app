import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function MentorCard({ item }) {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      {/* Top Section */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.image }} style={styles.avatar} />
          {item.isOnline && <View style={styles.onlineBadge} />}
        </View>

        <View style={{ flex: 1, marginLeft: 16 }}>
          <View style={styles.topRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>

          <View style={styles.specializations}>
            {item.specializations?.slice(0, 3).map((spec, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{spec}</Text>
              </View>
            ))}
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MaterialIcons name="star" size={14} color="#F59E0B" />
              <Text style={styles.metaText}>
                {item.rating}
                <Text style={styles.reviewCount}> ({item.reviews})</Text>
              </Text>
            </View>
            
            <View style={styles.metaDivider} />
            
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="briefcase-outline" size={14} color="#6B7280" />
              <Text style={styles.metaText}>{item.experience}</Text>
            </View>
          </View>

          <View style={styles.divider} />
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomRow}>
        <View
          style={[
            styles.priceBadge,
            item.isFree ? styles.freeBadge : styles.paidBadge,
          ]}
        >
          <Text
            style={item.isFree ? styles.freeText : styles.paidText}
          >
            {item.isFree ? "Free Session" : item.price}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() =>
            navigation.navigate("MentorBooking", { mentor: item })
          }
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginVertical: 8, 
    elevation: 3,
  },
  avatarContainer: {
    position: "relative",
    width: 70,
    height: 70,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  onlineBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
    zIndex: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#F9FAFB",
    borderRadius: 6,
    padding: 6,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  metaText: {
    color: "#4B5563",
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  metaDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 2,
  },
  specializations: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  tag: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 11,
    color: "#4F46E5",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 12,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  freeBadge: {
    backgroundColor: "#D1FAE5",
  },
  paidBadge: {
    backgroundColor: "#E0E7FF",
  },
  freeText: {
    color: "#059669",
    fontWeight: "600",
  },
  paidText: {
    color: "#4338CA",
    fontWeight: "600",
  },
  bookButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
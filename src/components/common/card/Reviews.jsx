import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { REVIEWS } from "../../../constants/reviews";

const Reviews = () => {
  const renderStars = (rating) => (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : "star-outline"}
          size={16}
          color="#FFD700"
        />
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.userName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.userName}</Text>
          <View style={styles.ratingContainer}>
            {renderStars(item.rating)}
            <Text style={styles.ratingText}>{item.rating}.0</Text>
          </View>
        </View>
      </View>

      <Text style={styles.comment}>"{item.comment}"</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}> 

      <View style={styles.header}>
        <Text style={styles.title}>What Our Users Say</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <FlatList
        data={REVIEWS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        snapToInterval={296}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  seeAll: {
    color: "#1976D2",
    fontSize: 14,
    fontWeight: "500",
  },
  listContainer: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 16,
  },

  reviewCard: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginRight: 16,

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    // Shadow (Android)
    elevation: 4,
  },

  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    fontSize: 13,
    color: "#FFA500",
    fontWeight: "600",
    marginLeft: 6,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#1976D2",
    fontWeight: "bold",
    fontSize: 16,
  },

  userInfo: {
    flex: 1,
  },

  userName: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 4,
    color: "#333",
  },

  starsContainer: {
    flexDirection: "row",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  comment: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 10,
  },

  date: {
    fontSize: 12,
    color: "#999",
  },
});

export default Reviews;
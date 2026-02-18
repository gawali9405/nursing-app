import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;

const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "beginner":
      return "#22C55E";
    case "intermediate":
      return "#F59E0B";
    case "advanced":
      return "#EF4444";
    default:
      return "#3B82F6";
  }
};

export default function TestCard({
  title,
  description,
  duration,
  questions,
  difficulty,
  category,
  attempts = 0,
  accuracy = 0,
  isPremium = false,
  onPress,
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const difficultyColor = getDifficultyColor(difficulty);

  return (
    <Pressable
      onPress={!isPremium ? onPress : null}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ marginBottom: 20 }}
    >
      <Animated.View
        style={[
          styles.cardWrapper,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <LinearGradient
          colors={["#1E3A8A", "#2563EB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          {/* Top Row */}
          <View style={styles.topRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {isPremium && (
                <Ionicons name="lock-closed" size={16} color="#FFD700" />
              )}
              <View
                style={[
                  styles.difficultyBadge,
                  { backgroundColor: difficultyColor },
                ]}
              >
                <Text style={styles.difficultyText}>{difficulty}</Text>
              </View>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>

          {/* Stats Section */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{attempts}</Text>
              <Text style={styles.statLabel}>Attempts</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{accuracy}%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{questions}</Text>
              <Text style={styles.statLabel}>Questions</Text>
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomRow}>
            <Text style={styles.durationText}>{duration}</Text>

            <Pressable
              style={[
                styles.startButton,
                isPremium && { backgroundColor: "#6B7280" },
              ]}
              onPress={!isPremium ? onPress : null}
            >
              <Text style={styles.startText}>
                {isPremium ? "Unlock" : "Start Test"}
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    borderRadius: 22,
    elevation: 8,
  },

  card: {
    borderRadius: 22,
    padding: 20,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  categoryBadge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  difficultyBadge: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  difficultyText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },

  description: {
    fontSize: 14,
    color: "#E5E7EB",
    marginBottom: 16,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  statItem: {
    alignItems: "center",
  },

  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  statLabel: {
    fontSize: 11,
    color: "#BFDBFE",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  durationText: {
    color: "#E0F2FE",
    fontSize: 14,
  },

  startButton: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },

  startText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});
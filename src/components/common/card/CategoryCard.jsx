import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Pressable,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 16 * 3) / 2;

const cardGradients = {
  live: ["#5B8CFF", "#6A5CFF"],
  free: ["#FF9A44", "#FF6A88"],
  subject: ["#FF5F6D", "#FFC371"],
  topic: ["#43CEA2", "#185A9D"],
  previous: ["#8E2DE2", "#4A00E0"],
  mock: ["#00C6FF", "#0072FF"],
};

export default function CategoryCard({
  title,
  icon,
  description,
  testCount,
  type = "live",
  onPress,
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const gradientColors = cardGradients[type] || cardGradients.live;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: false,
        friction: 5,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: false,
        friction: 5,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const glowShadow = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 25],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      style={{ borderRadius: 24 }}
    >
      <Animated.View
        style={[
          styles.cardWrapper,
          {
            transform: [{ scale: scaleAnim }],
            shadowRadius: glowShadow,
          },
        ]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          {/* Glow Overlay */}
          <View style={styles.glassOverlay} />

          {/* ICON */}
          <View style={styles.iconContainer}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          </View>

          {/* TEXT */}
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          </View>

          {/* BADGE */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {testCount} {testCount === 1 ? "Test" : "Tests"}
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    marginBottom: 18,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    elevation: 12,
  },

  card: {
    height: CARD_WIDTH * 1.25,
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    overflow: "hidden",
  },

  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  icon: {
    width: 36,
    height: 36,
    tintColor: "#fff",
  },

  textContainer: {
    alignItems: "center",
    paddingHorizontal: 6,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
    textAlign: "center",
  },

  description: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 16,
  },

  badge: {
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.35)",
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 30,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
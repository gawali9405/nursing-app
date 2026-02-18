import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HOME_BANNERS } from "../../../constants/homeBanners";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 60;
const CARD_MARGIN = 10;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function HomeBannerSlider() {
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create loop data (last + original + first)
  const data = [
    HOME_BANNERS[HOME_BANNERS.length - 1],
    ...HOME_BANNERS,
    HOME_BANNERS[0],
  ];

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % HOME_BANNERS.length;

        if (nextIndex === 0) {
          flatListRef.current?.scrollToIndex({
            index: HOME_BANNERS.length + 1,
            animated: true,
          });

          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: 1,
              animated: false,
            });
          }, 500);
        } else {
          flatListRef.current?.scrollToIndex({
            index: nextIndex + 1,
            animated: true,
          });
        }

        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* ================= SCROLL ANIMATION ================= */
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  const handleMomentumScrollEnd = (e) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(
      contentOffset / (CARD_WIDTH + CARD_MARGIN * 2)
    );

    if (index === 0) {
      flatListRef.current?.scrollToIndex({
        index: HOME_BANNERS.length,
        animated: false,
      });
      setCurrentIndex(HOME_BANNERS.length - 1);
    } else if (index === data.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index - 1);
    }
  };

  const getItemLayout = (_, index) => ({
    length: CARD_WIDTH + CARD_MARGIN * 2,
    offset: (CARD_WIDTH + CARD_MARGIN * 2) * index,
    index,
  });

  /* ================= RENDER ITEM ================= */
  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + CARD_MARGIN * 2),
      index * (CARD_WIDTH + CARD_MARGIN * 2),
      (index + 1) * (CARD_WIDTH + CARD_MARGIN * 2),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.92, 1, 0.92],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.page,
          {
            transform: [{ scale }],
            opacity,
            marginHorizontal: CARD_MARGIN,
          },
        ]}
      >
        <LinearGradient
          colors={item.gradient || ["#1E3A8A", "#3B82F6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </LinearGradient>
      </Animated.View>
    );
  };

  /* ================= UI ================= */
  return (
     <LinearGradient
  colors={[  
    "#FF7A59", // Coral
    "#FFA94D", // Orange
    "#FFD1A3", // Peach
    "#B8D8E8", // Light Blue
  ]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.container}
>
      <AnimatedFlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(_, index) => `banner-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
        decelerationRate="fast"
        initialScrollIndex={1}
        contentContainerStyle={styles.listContent}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {HOME_BANNERS.map((_, index) => (
          <View
            key={`dot-${index}`}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </LinearGradient>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    paddingBottom: 20,
    width: "100%",
  },
  listContent: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  page: {
    width: CARD_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: 150,
    borderRadius: 16,
    padding: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    lineHeight: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.2)",
    marginHorizontal: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: "#2563EB",
  },
});
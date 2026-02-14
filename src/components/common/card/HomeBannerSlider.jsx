import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { HOME_BANNERS } from "../../../constants/homeBanners";

const { width } = Dimensions.get("window");

export default function HomeBannerSlider() {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const ITEM_WIDTH = width; // full width for FlatList
  const CARD_WIDTH = width - 32; // banner width with side padding

  // Duplicate first item for smooth infinite loop
  const data = [...HOME_BANNERS, HOME_BANNERS[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;

      flatListRef.current?.scrollToOffset({
        offset: nextIndex * ITEM_WIDTH,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleMomentumEnd = () => {
    if (currentIndex === HOME_BANNERS.length) {
      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
      setCurrentIndex(0);
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        scrollEnabled={false} // no manual scroll
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumEnd}
        renderItem={({ item }) => (
          <View style={[styles.page, { width: ITEM_WIDTH }]}>
            <View
              style={[styles.banner, { width: CARD_WIDTH, backgroundColor: item.color }]}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {HOME_BANNERS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex % HOME_BANNERS.length === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    height: 150,
    borderRadius: 24, // Rounded corners
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  subtitle: {
    color: "#fff",
    marginTop: 8,
    fontSize: 14,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 18,
    backgroundColor: "#111",
  },
});
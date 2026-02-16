import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import { HOME_BANNERS } from "../../../constants/homeBanners";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 60; // 30px padding on each side
const CARD_MARGIN = 10;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function HomeBannerSlider() {
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Add first item to end and last item to beginning for infinite scroll
  const data = [
    HOME_BANNERS[HOME_BANNERS.length - 1],
    ...HOME_BANNERS,
    HOME_BANNERS[0]
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % HOME_BANNERS.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex + 1, // +1 because we added an item at the beginning
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (e) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (CARD_WIDTH + CARD_MARGIN * 2));
    
    // Handle infinite scroll
    if (index === 0) {
      // If at the first (cloned last) item, snap to the real last item
      flatListRef.current?.scrollToIndex({
        index: HOME_BANNERS.length,
        animated: false,
      });
      setCurrentIndex(HOME_BANNERS.length - 1);
    } else if (index === data.length - 1) {
      // If at the last (cloned first) item, snap to the real first item
      flatListRef.current?.scrollToIndex({ index: 1, animated: false });
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index - 1); // -1 because we added an item at the beginning
    }
  };

  const getItemLayout = (_, index) => ({
    length: CARD_WIDTH + CARD_MARGIN * 2,
    offset: (CARD_WIDTH + CARD_MARGIN * 2) * index,
    index,
  });

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + CARD_MARGIN * 2),
      index * (CARD_WIDTH + CARD_MARGIN * 2),
      (index + 1) * (CARD_WIDTH + CARD_MARGIN * 2),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.92, 1, 0.92],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
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
        <View style={[styles.banner, { backgroundColor: item.color }]}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {item.subtitle}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  listContent: {
    paddingHorizontal: 20 - CARD_MARGIN, // Compensate for margin on items
  },
  page: {
    width: CARD_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: 150,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 3,
    transition: 'all 0.3s ease',
  },
  activeDot: {
    width: 20,
    backgroundColor: '#007AFF',
  },
});
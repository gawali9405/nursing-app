import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import { QUICK_ACTIONS } from "../../../constants/quickActions";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;
const SPACING = (width - ITEM_WIDTH) / 2;

export default function QuickActions({ navigation }) {
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(1);

  // Circular Data
  const sliderData = [
    QUICK_ACTIONS[QUICK_ACTIONS.length - 1],
    ...QUICK_ACTIONS,
    QUICK_ACTIONS[0],
  ];

  // Auto Scroll
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Infinite Loop Fix
  const handleScrollEnd = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / ITEM_WIDTH
    );

    if (index === 0) {
      flatListRef.current?.scrollToIndex({
        index: QUICK_ACTIONS.length,
        animated: false,
      });
      setCurrentIndex(QUICK_ACTIONS.length);
    } else if (index === QUICK_ACTIONS.length + 1) {
      flatListRef.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
      setCurrentIndex(1);
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Animated.FlatList
        ref={flatListRef}
        data={sliderData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        onMomentumScrollEnd={handleScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          return (
            <View style={{ width: ITEM_WIDTH }}>
              <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.inner}
                  onPress={() => navigation.navigate(item.screen)}
                >
                  
                  {/* Big Image Icon */}
                  <View style={styles.iconWrapper}>
                    <Image
                      source={item.image}
                      style={styles.iconImage}
                      resizeMode="contain"
                    />
                  </View>

                  <Text style={styles.text}>{item.label}</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 220,
    backgroundColor: "#fff",
    borderRadius: 30,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#F3F6FB",
    padding: 25,
    borderRadius: 40,
    marginBottom: 15,
  },
  iconImage: {
    width: 90,   
    height: 90,
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
});
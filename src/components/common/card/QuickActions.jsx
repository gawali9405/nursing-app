import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { QUICK_ACTIONS } from "../../../constants/quickActions";

const { width } = Dimensions.get("window");

export default function QuickActions({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  // Circular data (last + original + first)
  const sliderData = [
    QUICK_ACTIONS[QUICK_ACTIONS.length - 1],
    ...QUICK_ACTIONS,
    QUICK_ACTIONS[0],
  ];

  // Handle infinite loop jump
  const handleScrollEnd = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / width
    );

    setCurrentIndex(index);

    // If swiped to fake first
    if (index === 0) {
      flatListRef.current?.scrollToIndex({
        index: QUICK_ACTIONS.length,
        animated: false,
      });
      setCurrentIndex(QUICK_ACTIONS.length);
    }

    // If swiped to fake last
    if (index === QUICK_ACTIONS.length + 1) {
      flatListRef.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
      setCurrentIndex(1);
    }
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={sliderData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item }) => (
          <View style={styles.page}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Ionicons name={item.icon} size={42} color="#007AFF" />
              <Text style={styles.text}>{item.label}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: width,
    alignItems: "center",
  },
  card: {
    width: width - 32,
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  text: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
});
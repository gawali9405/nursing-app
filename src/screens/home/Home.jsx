import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/layout/ScreenWrapper";
import CategoryCard from "../../components/common/card/CategoryCard";
import { TEST_CATEGORIES } from "../../constants/testCategories";
import QuickActions from "../../components/common/card/QuickActions";
import HomeBannerSlider from "../../components/common/card/HomeBannerSlider";

export default function Home({ navigation }) {
  return (
    <ScreenWrapper title="Home" lightTheme>
      <ScrollView contentContainerStyle={styles.container}>

        <HomeBannerSlider />
        <View style={styles.grid}>
          {TEST_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              icon={category.icon}
              onPress={() => navigation.navigate(category.screen)}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <QuickActions navigation={navigation} />


      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
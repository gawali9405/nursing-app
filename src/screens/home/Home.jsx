import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/layout/ScreenWrapper";
import CategoryCard from "../../components/common/card/CategoryCard";
import { TEST_CATEGORIES } from "../../constants/testCategories";
import QuickActions from "../../components/common/card/QuickActions";
import HomeBannerSlider from "../../components/common/card/HomeBannerSlider";
import SocialConnections from "../../components/common/card/SocialConnections";
import Reviews from "../../components/common/card/Reviews";

export default function Home({ navigation }) {
  return (
    <ScreenWrapper title="Home" lightTheme>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <HomeBannerSlider />

        {/* Category Grid */}
        <View style={styles.grid}>
          {TEST_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              icon={category.icon}
              description={category.subtitle}
              testCount={category.count}
              type={category.id === 'pyq' ? 'previous' : category.id}
              onPress={() => navigation.navigate(category.screen)}
            />
          ))}
        </View>

        {/* Quick Actions Slider */}
        <QuickActions navigation={navigation} />

        {/* Social Connections */}
        <SocialConnections />

        {/* User Reviews */}
        <Reviews />

      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 15,
  },
});
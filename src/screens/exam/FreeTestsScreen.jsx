import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenWrapper from "../../components/layout/ScreenWrapper";
import TestCard from "../../components/common/card/TestCard";
import Input from "../../components/common/Input";

import {
  FREE_TESTS_DATA,
  FREE_TESTS_CONFIG,
} from "../../constants/FreeTestsScreen";

export default function FreeTestsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const categories = FREE_TESTS_DATA.categories;
  const levels = FREE_TESTS_DATA.levels;

  const filteredTests = useMemo(() => {
    let tests = FREE_TESTS_DATA.tests;

    if (selectedCategory !== "All") {
      tests = tests.filter((t) => t.category === selectedCategory);
    }

    if (selectedLevel !== "All") {
      tests = tests.filter((t) => t.difficulty === selectedLevel);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tests = tests.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    return tests;
  }, [searchQuery, selectedCategory, selectedLevel]);

  const handleTestPress = (test) => {
    navigation.navigate("TestDetails", { test });
  };

  const renderTest = ({ item }) => (
    <TestCard
      title={item.title}
      description={item.description}
      duration={item.duration}
      questions={item.questions}
      difficulty={item.difficulty}
      category={item.category}
      onPress={() => handleTestPress(item)}
    />
  );

  return (
    <ScreenWrapper lightTheme scrollable={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header with Filter Icon */}
      <View style={styles.header}>
        <Text style={styles.title}>Available Tests</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.count}>{filteredTests.length} Tests</Text>
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            style={styles.filterIcon}
          >
            <Ionicons
              name="filter"
              size={20}
              color="#3b82f6"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Dropdown */}
      {showFilters && (
        <View style={styles.filterDropdown}>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Category</Text>
            <View style={styles.filterOptions}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.filterOption,
                    selectedCategory === cat && styles.activeFilterOption,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedCategory === cat && styles.activeFilterOptionText,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Difficulty</Text>
            <View style={styles.filterOptions}>
              {levels.map((level) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => setSelectedLevel(level)}
                  style={[
                    styles.filterOption,
                    selectedLevel === level && styles.activeFilterOption,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedLevel === level && styles.activeFilterOptionText,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Search */}
      <View style={styles.searchSection}>
        <Input
          placeholder={FREE_TESTS_CONFIG.searchPlaceholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={{ marginBottom: 0 }}
          icon={<Ionicons name="search" size={18} color="#6b7280" />}
        />
      </View>

      {/* Test List */}
      <FlatList
        data={filteredTests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTest}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          alignItems: 'center'
        }}
        ListEmptyComponent={
          <View style={styles.noResults}>
            <Ionicons name="search-outline" size={48} color="#6b7280" />
            <Text style={styles.noResultsText}>
              {FREE_TESTS_CONFIG.noResultsMessage}
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.5,
  },

  count: {
    fontSize: 14,
    color: "#64748b",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  filterIcon: {
    marginLeft: 12,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  filterDropdown: {
    marginHorizontal: 24,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },

  filterSection: {
    marginBottom: 20,
  },

  filterSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 14,
    letterSpacing: -0.2,
  },

  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#f8fafc",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    minWidth: 80,
    alignItems: "center",
  },

  activeFilterOption: {
    backgroundColor: "#059669",
    borderColor: "#059669",
  },

  filterOptionText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "600",
  },

  activeFilterOptionText: {
    color: "#ffffff",
    fontWeight: "700",
  },

  searchSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },

  noResults: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    marginTop: 40,
  },

  noResultsText: {
    marginTop: 20,
    fontSize: 18,
    color: "#64748b",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: -0.2,
  },
});
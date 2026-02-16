import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/layout/ScreenWrapper";
import { MENTORS_DATA, ALL_SPECIALIZATIONS } from "../../constants/mentorship";
import MentorCard from "../../components/common/card/MentorCard";
import SearchBar from "../../components/mentorship/SearchBar";
import SpecializationChips from "../../components/mentorship/SpecializationChips";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  // Header
  header: { 
    paddingTop: 8,
  },

  // Mentor Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#10B981',
    borderRadius: 10,
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  mentorInfo: {
    marginLeft: 16,
    flex: 1,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  mentorTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ratingText: {
    color: '#92400E',
    fontWeight: '600',
    marginLeft: 4,
  },
  reviewCount: {
    color: '#6B7280',
    fontWeight: 'normal',
  },
  specializations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  specializationTag: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  specializationText: {
    color: '#1E40AF',
    fontSize: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceText: {
    color: '#6B7280',
    fontSize: 14,
    marginLeft: 4,
  },
  priceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  freeBadge: {
    backgroundColor: '#D1FAE5',
  },
  paidBadge: {
    backgroundColor: '#F3E8FF',
  },
  freeText: {
    color: '#065F46',
    fontWeight: '500',
    fontSize: 14,
  },
  paidText: {
    color: '#5B21B6',
    fontWeight: '500',
    fontSize: 14,
  },
  bookButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    opacity: 0.5,
  },
  emptyTitle: {
    color: '#6B7280',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default function Mentorship({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [filteredMentors, setFilteredMentors] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMentors(MENTORS_DATA);
      setFilteredMentors(MENTORS_DATA);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterMentors();
  }, [searchQuery, selectedSpecialization, mentors]);

  const filterMentors = () => {
    let result = [...mentors];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(mentor =>
        mentor.name.toLowerCase().includes(query) ||
        mentor.title.toLowerCase().includes(query) ||
        mentor.specializations.some(spec =>
          spec.toLowerCase().includes(query)
        )
      );
    }

    // Apply specialization filter
    if (selectedSpecialization !== 'All') {
      result = result.filter(mentor =>
        mentor.specializations.includes(selectedSpecialization)
      );
    }

    setFilteredMentors(result);
  };

  const renderMentorCard = ({ item }) => (
    <MentorCard 
      item={item} 
      onBookPress={() => navigation.navigate("MentorBooking", { mentor: item })}
    />
  );

  const ListHeaderComponent = () => (
    <View style={styles.header}>
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />
      <SpecializationChips 
        specializations={ALL_SPECIALIZATIONS}
        selectedSpecialization={selectedSpecialization}
        onSelectSpecialization={setSelectedSpecialization}
      />
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="account-search-outline"
        size={60}
        color="#D1D5DB"
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyTitle}>
        No mentors found
      </Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your search or filters
      </Text>
    </View>
  );

  return (
    <ScreenWrapper
      title="Find a Mentor"
      loading={loading}
      scrollable={false}
      contentContainerStyle={{ flex: 1 }}
    >
      <FlatList
        data={filteredMentors}
        renderItem={renderMentorCard}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={[styles.container, { flexGrow: 1 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </ScreenWrapper>
  );
}
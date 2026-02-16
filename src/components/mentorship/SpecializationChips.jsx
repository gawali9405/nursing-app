import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const SpecializationChips = ({ 
  specializations, 
  selectedSpecialization, 
  onSelectSpecialization 
}) => {
  const renderChip = ({ item: specialization }) => {
    const isSelected = selectedSpecialization === specialization;
    return (
      <TouchableOpacity
        key={specialization}
        style={[
          styles.chip,
          isSelected ? styles.selectedChip : styles.unselectedChip
        ]}
        onPress={() => onSelectSpecialization(specialization)}
      >
        <Text style={[
          styles.chipText,
          isSelected ? styles.selectedChipText : styles.unselectedChipText
        ]}>
          {specialization}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={specializations}
      renderItem={renderChip}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipsContainer}
    />
  );
};

const styles = StyleSheet.create({
  chipsContainer: {
    paddingRight: 16,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedChip: {
    backgroundColor: '#2563EB',
  },
  unselectedChip: {
    backgroundColor: '#E5E7EB',
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
  unselectedChipText: {
    color: '#374151',
  },
});

export default SpecializationChips;

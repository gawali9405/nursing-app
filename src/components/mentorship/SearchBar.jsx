import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText, onClear }) => {
  return (
    <View style={styles.searchContainer}>
      <MaterialIcons name="search" size={20} color="#9CA3AF" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search mentors by name or specialization..."
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />
      {value ? (
        <TouchableOpacity onPress={onClear}>
          <MaterialIcons name="close" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,  
    paddingHorizontal:5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#1F2937',
    fontSize: 16,
  },
});

export default SearchBar;

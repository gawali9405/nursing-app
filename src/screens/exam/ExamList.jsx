import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { examData } from "../../constants/examList";

// ExamCard component
const ExamCard = ({ exam, onPress }) => {
  if (!exam) return null; // Add null check
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.card, { borderLeftWidth: 5, borderLeftColor: exam.color }]}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: `${exam.color}20` }]}>
              <MaterialIcons name={exam.icon} size={24} color={exam.color} />
            </View>
            <Text style={styles.title}>{exam.name}</Text>
          </View>
          <Text style={styles.description}>{exam.description}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <MaterialIcons name="help-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{exam.questions} Questions</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="access-time" size={16} color="#666" />
              <Text style={styles.detailText}>{exam.duration}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ExamList component
const ExamList = ({ navigation }) => {
  const handleExamPress = (exam) => {
    console.log('Exam selected:', exam.name);
    // Navigate to exam details or start exam
    // navigation.navigate('ExamDetails', { examId: exam.id });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {examData.map((exam) => (
          <ExamCard 
            key={exam.id}
            exam={exam}
            onPress={() => handleExamPress(exam)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
  },
});

export default ExamList;

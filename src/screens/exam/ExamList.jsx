import React, { useState, useEffect } from "react";
import { 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Text,
  ActivityIndicator as RNActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/layout/ScreenWrapper";

const examData = [
  {
    id: 1,
    name: "AIIMS Nursing",
    description: "All India Institute of Medical Sciences Nursing Exam",
    icon: "medication",
    questions: 200,
    duration: "3 hours",
    color: "#4CAF50"
  },
  {
    id: 2,
    name: "RRB Nursing",
    description: "Railway Recruitment Board Nursing Exam",
    icon: "train",
    questions: 150,
    duration: "2.5 hours",
    color: "#2196F3"
  },
  {
    id: 3,
    name: "NORCET",
    description: "Nursing Officer Recruitment Common Eligibility Test",
    icon: "medical-services",
    questions: 180,
    duration: "3 hours",
    color: "#9C27B0"
  },
  {
    id: 4,
    name: "ESIC Nursing",
    description: "Employees' State Insurance Corporation Nursing Exam",
    icon: "local-hospital",
    questions: 160,
    duration: "2.5 hours",
    color: "#FF5722"
  }
];

const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const Title = ({ children, style }) => (
  <Text style={[styles.title, style]}>{children}</Text>
);

const Paragraph = ({ children, style }) => (
  <Text style={[styles.paragraph, style]}>{children}</Text>
);

const ActivityIndicator = ({ size, color, style }) => (
  <RNActivityIndicator size={size} color={color} style={style} />
);

export default function ExamList({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const primaryColor = '#6200ee'; // Default primary color

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setExams(examData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleExamPress = (exam) => {
    // Navigate to exam details or start exam
    console.log("Selected exam:", exam.name);
  };

  if (loading) {
    return (
      <ScreenWrapper title="Available Exams">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper title="Available Exams">
      <ScrollView contentContainerStyle={styles.container}>
        {exams.map((exam) => (
          <TouchableOpacity 
            key={exam.id} 
            onPress={() => handleExamPress(exam)}
            activeOpacity={0.8}
          >
            <Card style={[styles.card, { borderLeftWidth: 5, borderLeftColor: exam.color }]}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: `${exam.color}20` }]}>
                    <MaterialIcons name={exam.icon} size={24} color={exam.color} />
                  </View>
                  <Title style={styles.title}>{exam.name}</Title>
                </View>
                <Paragraph style={styles.description}>{exam.description}</Paragraph>
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
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  paragraph: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
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
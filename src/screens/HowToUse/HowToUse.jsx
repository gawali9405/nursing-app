import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ScreenWrapper from "../../components/layout/ScreenWrapper";
import STEPS from "../../constants/howtouse";

// Enable layout animations for Android (only affects old architecture)
if (Platform.OS === "android" && !global.RN$Bridgeless) {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function HowToUse() {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <LinearGradient
          colors={["#4f46e5", "#7c3aed"]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>How To Use NPath</Text>
          <Text style={styles.headerSubtitle}>
            Follow these simple steps to get started
          </Text>
        </LinearGradient>

        <View style={styles.container}>
          
          {/* STEPS */}
          {STEPS.map((step) => (
            <View key={step.id} style={styles.card}>
              <View style={styles.stepRow}>
                <View style={styles.circle}>
                  <Text style={styles.circleText}>{step.id}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>
                    {step.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* FAQ SECTION */}
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

          {[
            {
              q: "Is NPath free to use?",
              a: "Some tests are free while premium test series require subscription.",
            },
            {
              q: "Can I review my previous tests?",
              a: "Yes, you can review your past test attempts from the Profile section.",
            },
            {
              q: "Does the app work offline?",
              a: "Some downloaded content may work offline, but tests require internet.",
            },
          ].map((item, index) => (
            <View key={index} style={styles.faqCard}>
              <TouchableOpacity onPress={() => toggleFAQ(index)}>
                <Text style={styles.faqQuestion}>{item.q}</Text>
              </TouchableOpacity>

              {activeFAQ === index && (
                <Text style={styles.faqAnswer}>{item.a}</Text>
              )}
            </View>
          ))}

          {/* CONTACT BUTTON */}
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportText}>Contact Support</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { 
    padding: 25, 
    borderRadius: 25,
    marginTop: 15,
  },
  headerTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#e0e7ff",
    marginTop: 5,
  },
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  stepRow: {
    flexDirection: "row",
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#4f46e5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  circleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stepDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  faqCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  faqQuestion: {
    fontWeight: "bold",
  },
  faqAnswer: {
    marginTop: 8,
    color: "#555",
  },
  supportButton: {
    backgroundColor: "#4f46e5",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  supportText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
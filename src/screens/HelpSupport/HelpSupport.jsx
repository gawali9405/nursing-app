import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  Image,
  Linking,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { faqs } from "../../constants/faqs";

const PRIMARY = "#4F46E5";
const WHATSAPP_NUMBER = "919876543210"; // without +

export default function HelpSupport({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const toggleFAQ = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openEmail = () => {
    Linking.openURL("mailto:support@npath.com");
  };

  const openDialer = () => {
    Linking.openURL("tel:+919876543210");
  };

  const openWhatsApp = () => {
    Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerImageContainer}>
          <Image
            source={require("../../assets/images/helpdesk.jpg")}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
        </View>
        {/* Contact Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#1E1E1E" : "#fff" },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              { color: isDark ? "#fff" : "#000" },
            ]}
          >
            Contact Us
          </Text>

          <TouchableOpacity style={styles.row} onPress={openEmail}>
            <Ionicons name="mail-outline" size={20} color={PRIMARY} />
            <Text style={[styles.rowText, { color: isDark ? "#ccc" : "#333" }]}>
              support@npath.com
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={openDialer}>
            <Feather name="phone" size={20} color={PRIMARY} />
            <Text style={[styles.rowText, { color: isDark ? "#ccc" : "#333" }]}>
              +91 9876543210
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={openWhatsApp}>
            <FontAwesome name="whatsapp" size={20} color="#25D366" />
            <Text style={[styles.rowText, { color: isDark ? "#ccc" : "#333" }]}>
              Chat on WhatsApp
            </Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#1E1E1E" : "#fff" },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              { color: isDark ? "#fff" : "#000" },
            ]}
          >
            Frequently Asked Questions
          </Text>

          {faqs.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.faqRow}
                onPress={() => toggleFAQ(index)}
              >
                <Text
                  style={[
                    styles.faqQuestion,
                    { color: isDark ? "#ddd" : "#333" },
                  ]}
                >
                  {item.question}
                </Text>
                <Ionicons
                  name={
                    activeIndex === index
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={18}
                  color={PRIMARY}
                />
              </TouchableOpacity>

              {activeIndex === index && (
                <Text
                  style={[
                    styles.faqAnswer,
                    { color: isDark ? "#aaa" : "#666" },
                  ]}
                >
                  {item.answer}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* App Info */}
        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#1E1E1E" : "#fff" },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              { color: isDark ? "#fff" : "#000" },
            ]}
          >
            App Information
          </Text>
          <Text style={{ color: isDark ? "#aaa" : "#666" }}>
            Version 1.0.0
          </Text>
          <Text style={{ color: isDark ? "#aaa" : "#666" }}>
            2026 NPath
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerImageContainer: {
    height: 200,
    width: '100%',
    marginTop: 0,
    marginBottom: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 16,
    marginTop: 0,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  rowText: {
    marginLeft: 10,
    fontSize: 14,
  },
  faqRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: "500",
  },
  faqAnswer: {
    fontSize: 13,
    paddingBottom: 10,
  },
});
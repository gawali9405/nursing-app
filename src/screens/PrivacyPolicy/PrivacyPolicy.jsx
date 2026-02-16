import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";

export default function PrivacyPolicy() {
  const baseFontSize = 16;
  const minFontSize = 12;
  const maxFontSize = 28;

  const [fontSize, setFontSize] = useState(baseFontSize);
  const lastScale = useRef(1);

  const onPinchEvent = (event) => {
    const scale = event.nativeEvent.scale;
    const newSize = baseFontSize * scale * lastScale.current;

    if (newSize >= minFontSize && newSize <= maxFontSize) {
      setFontSize(newSize);
    }
  };

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current = fontSize / baseFontSize;
    }
  };

  const textStyle = {
    fontSize,
    lineHeight: fontSize * 1.6,
    textAlign: 'justify',
    color: '#2c3e50',
    marginBottom: 16,
  };

  const headingStyle = {
    fontSize: fontSize + 4,
    fontWeight: '600',
    marginTop: fontSize,
    marginBottom: fontSize / 2,
    color: '#1a1a1a',
  };

  return (
    <SafeAreaView style={styles.container}>
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.title, { fontSize: fontSize + 8 }]}>
            Privacy Policy
          </Text>

          <Text style={[styles.lastUpdated, { fontSize: fontSize - 2 }]}>
            Last Updated: February 15, 2026
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            This Privacy Policy describes how NPath ("Company", "we", "our", or "us")
            collects, uses, discloses, and protects your information when you use the
            NPath mobile application (the "App"). By using the App, you agree to the
            collection and use of information in accordance with this Privacy Policy.
          </Text>

          <Text style={[styles.heading, headingStyle]}>
            1. Information We Collect
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            We may collect the following categories of information:
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            - Personal Information: Name, email address, and authentication details
            provided during registration or login (including third-party login providers).
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            - Academic Information: Test attempts, scores, rankings, answers submitted,
            and performance analytics.
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            - Device Information: Device model, operating system, app version,
            IP address, and anonymous usage statistics.
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            - Communication Data: Messages or support requests sent to us.
          </Text>

          <Text style={[styles.heading, headingStyle]}>
            2. How We Use Your Information
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            We use collected information to:
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            - Create and manage user accounts
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            - Provide nursing test series, mock exams, and performance tracking
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            - Improve content quality and app functionality
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            - Send important updates, notifications, or exam alerts
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            - Respond to support requests and technical issues
          </Text>

          <Text style={[styles.heading, headingStyle]}>
            3. Authentication and Data Storage
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            User authentication and certain data storage may be securely handled
            through trusted third-party infrastructure providers. All data is stored
            using industry-standard encryption and security practices.
          </Text>

          <Text style={[styles.heading, headingStyle]}>
            4. Data Sharing and Disclosure
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            We do not sell, rent, or trade your personal information. We may share
            limited data with trusted service providers strictly for operating,
            maintaining, and improving the App, under confidentiality obligations.
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            We may disclose information if required by law or in response to valid
            legal requests.
          </Text>

          <Text style={[styles.heading, headingStyle]}>
            5. Data Retention
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            We retain your information for as long as your account remains active
            or as necessary to provide services. You may request deletion of your
            account and associated data at any time.
          </Text>

          <Text style={[styles.heading, headingStyle]}>
            6. Account Deletion
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            Users may request account deletion by contacting us at the email below.
            Upon verification, we will permanently delete or anonymize your personal
            data, except where retention is required by law.
          </Text>

          <Text style={[styles.heading, headingStyle]}>
            7. Security of Your Information
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            We implement reasonable administrative, technical, and physical security
            measures to protect your personal data. However, no electronic transmission
            or storage method can be guaranteed to be 100% secure.
          </Text>

          <Text style={[styles.heading, headingStyle]}>
            8. Children's Privacy
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            The App is not intended for children under 13 years of age. We do not
            knowingly collect personal data from children. If such data is discovered,
            it will be deleted promptly.
          </Text>

          <Text style={[styles.heading, headingStyle]}>
            9. Third-Party Services
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            The App may use third-party services such as analytics or notification
            providers. These services may collect anonymous usage data in accordance
            with their respective privacy policies.
          </Text>

          <Text style={[styles.heading, headingStyle]}>
            10. Changes to This Privacy Policy
          </Text>

          <Text style={[styles.paragraph, textStyle]}>
            We reserve the right to update this Privacy Policy at any time.
            Changes will be posted within the App with a revised "Last Updated" date.
            Continued use of the App after changes constitutes acceptance.
          </Text>

          <Text style={[styles.heading, headingStyle]}>
            11. Contact Us
          </Text>

          <Text style={[styles.paragraph, { ...textStyle, marginBottom: 40 }]}>
            If you have any questions regarding this Privacy Policy or wish to
            exercise your data rights, please contact us at:
            {"\n\n"}
            Email: support@npath.com
          </Text>
        </ScrollView>
      </PinchGestureHandler>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  lastUpdated: {
    color: "#7f8c8d",
    marginBottom: 20,
    fontStyle: "italic",
  },
  heading: {
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    color: "#1a1a1a",
  },
  paragraph: {
    color: "#2c3e50",
    marginBottom: 16,
    textAlign: "justify",
  },
});
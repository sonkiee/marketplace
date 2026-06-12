import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const privacyPolicyText = [
  {
    title: "Return Policy",
    content:
      "We are committed to providing customers with a fair and transparent return policy. All returns must be made within 30 days of purchase, and must be in the original packaging. We will not accept returns that are not in the original packaging or that are damaged. Please note that we may not be able to provide a full refund for items that have been damaged or that have been returned to us in a condition that we cannot repair. If you are dissatisfied with your purchase, please contact our support team.",
  },
  {
    title: "Privacy Policy",
    content:
      "We respect your privacy and are committed to protecting your personal data. We use your information only for the purposes of processing your orders and improving our services. We do not share your information with third parties unless required by law or necessary to fulfill your order.",
  },
];

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {privacyPolicyText.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.title}>{section.title}</Text>
            <Text style={styles.content}>{section.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "red",
  },
  content: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});

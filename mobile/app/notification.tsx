import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";

const NotificationScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.notificationItem}>
        <View style={styles.notificationHeader}>
          <Octicons name="dot-fill" size={12} color="red" />
          <Text style={styles.notificationTitle}>Order Ref #67556gtfr</Text>
          <Text style={styles.notificationSubtitle}> delivered yesterday</Text>
        </View>
        <Text style={styles.date}>July 18, 2024</Text>
        <View style={styles.actionContainer}>
          <View style={[styles.actionButton, styles.skyBlueBorder]}>
            <Text style={[styles.actionText, { color: "#87CEEB" }]}>
              Give review
            </Text>
          </View>
          <View style={styles.actionButton}>
            <Text style={styles.actionText}>Rate on Playstore</Text>
          </View>
        </View>
      </View>

      <View style={styles.notificationItem}>
        <View style={styles.notificationHeader}>
          <Octicons name="dot-fill" size={12} color="red" />
          <Text style={styles.notificationTitle}>Explore 56 new vendors</Text>
          <Text style={styles.notificationSubtitle}> joined yesterday</Text>
        </View>
        <Text style={styles.date}>July 18, 2024</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  notificationItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  notificationSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginBottom: 12,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skyBlueBorder: {
    borderColor: "#87CEEB",
  },
  actionText: {
    fontWeight: "500",
    fontSize: 13,
  },
});

export default NotificationScreen;

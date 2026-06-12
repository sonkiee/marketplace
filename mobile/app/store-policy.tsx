import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const StorePolicies = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.policyContainer}>
        <Text style={styles.policyTitle}>Return Policy</Text>
        <Text style={styles.policyDescription}>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content.
        </Text>
      </View>
      <View style={styles.policyContainer}>
        <Text style={styles.policyTitle}>Refund Policy</Text>
        <Text style={styles.policyDescription}>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content.
        </Text>
      </View>
      <View style={styles.policyContainer}>
        <Text style={styles.policyTitle}>Privacy Policy</Text>
        <Text style={styles.policyDescription}>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.navigate("/store-review")}
        style={styles.nextButton}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  policyContainer: {
    marginVertical: 10,
  },
  policyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  policyDescription: {
    fontSize: 14,
    color: "#666",
  },
  nextButton: {
    backgroundColor: "#FF0000",
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default StorePolicies;

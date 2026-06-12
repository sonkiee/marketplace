import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const Where = ({ location }) => {
  const places = [
    { name: "Home", icon: "home-outline", color: "#3f51b5" },
    { name: "Apartment", icon: "briefcase-outline", color: "#f44336" },
    { name: "Office", icon: "school-outline", color: "#9c27b0" },
    { name: "Other", icon: "restaurant-outline", color: "#ff9800" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Where shall we deliver to? </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Ionicons
          name="location-outline"
          size={18}
          color="black"
          style={{ marginBottom: 5 }}
        />

        <Text>Use currentlocation</Text>
      </View>
      <Text>Recommended</Text>

      <View
        style={{
          position: "relative",
          marginTop: 60,
        }}
      >
        <CustomButton
          handlePress={() => router.push("/location-search")}
          // disabled={!location}
          title="Add new address"
        />
      </View>
    </View>
  );
};

export default Where;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  placeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "45%",
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  placeText: {
    fontSize: 16,
    color: "#333",
  },
});

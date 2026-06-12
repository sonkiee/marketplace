import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SuccessAnimation from "./SuccessAnimation";

const Places = ({ showSuccessAnimation, setShowSuccessAnimation }) => {
  const places = [
    { name: "Home", icon: "home-outline", color: "#3f51b5" },
    { name: "Apartment", icon: "briefcase-outline", color: "#f44336" },
    { name: "Office", icon: "school-outline", color: "#9c27b0" },
    { name: "Other", icon: "restaurant-outline", color: "#ff9800" },
  ];

  const handleSkipPress = () => {
    setShowSuccessAnimation(false);
    router.navigate("/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What kind of place is this?</Text>
      <View style={styles.placesWrapper}>
        {places.map((place, index) => (
          <TouchableOpacity
            key={index}
            style={styles.placeContainer}
            onPress={() => setShowSuccessAnimation(true)}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: place.color }]}
            >
              <Ionicons name={place.icon} size={18} color="white" />
            </View>
            <Text style={styles.placeText}>{place.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Places;

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
    marginBottom: 30,
  },
  placesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
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

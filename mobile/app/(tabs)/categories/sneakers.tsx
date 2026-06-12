import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Sneakers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sneakers</Text>
    </View>
  );
};

export default Sneakers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 16,
    paddingVertical: 20,
  },
  offerListGrid: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 16,

    color: "#333",

    overflow: "hidden",
  },
});

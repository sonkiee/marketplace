import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const CategoryCard = ({ item }) => {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryItem}>
        <Image source={item.image} style={styles.categoryImage} />
        <Text style={styles.categoryText}>{item.title}</Text>
      </View>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  categoryContainer: {
    marginVertical: 8, // Consolidate marginTop and marginBottom
  },
  categoryItem: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 22,
    width: 130,
    marginHorizontal: 2, // Space between items
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20, // Border radius to match the image size
    resizeMode: "contain",
  },
  categoryText: {
    fontSize: 12,
    color: "black",
    fontWeight: "700",
    marginLeft: 8, // Space between image and text
  },
});

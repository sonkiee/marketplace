import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const reviews = [
  {
    id: "1",
    rating: 5,
    comment: "made my acne scars disappear, definitely recommend",
    date: "2023-06-24",
    user: "Joshua Simon",
    location: "Lekki, Lagos",
  },
  {
    id: "2",
    rating: 3,
    comment: "made my acne scars disappear, definitely recommend",
    date: "2023-06-24",
    user: "Joshua Simon",
    location: "Lekki, Lagos",
  },
  // Add more reviews here
];

const Review = () => {
  return (
    <View style={styles.container}>
      <View style={styles.reviewsSection}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.sectionTitle}>Product rating & review</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewItem}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.reviewHeader}>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Ionicons key={index} name="star" size={16} color="gold" />
                ))}
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>

            <Text style={styles.reviewUser}>By {review.user}</Text>
            <Text style={styles.reviewLocation}>{review.location}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  reviewsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  seeAll: {
    color: "blue",
    marginBottom: 8,
  },
  reviewItem: {
    marginVertical: 8,
  },
  reviewHeader: {
    flexDirection: "row",
    marginBottom: 4,
  },
  reviewComment: {
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  reviewUser: {
    marginBottom: 4,
  },
  reviewLocation: {
    marginBottom: 4,
    fontWeight: "500",
  },
});

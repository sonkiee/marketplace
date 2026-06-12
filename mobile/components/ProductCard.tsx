import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Icons, Images } from "@/constants/Images"; // Make sure to replace this with actual paths to your image assets

const data = [
  { id: "1", title: "Heels", image: Images.heels },
  { id: "2", title: "Sneakers", image: Images.heels },
  { id: "3", title: "Accessories", image: Images.heels },
  { id: "4", title: "Skincare", image: Images.heels },
  { id: "5", title: "Appliances", image: Images.heels },
];

const offers = [
  {
    id: "1",
    price: "₦12,000",
    time: "20 mins",
    product: "Glycolic acid 7% for hyperpigmentation",
    image: Images.product,
  },
  {
    id: "2",
    price: "₦12,000",
    time: "20 mins",
    product: "Glycolic acid 7% for hyperpigmentation",
    image: Images.product,
  },
  // Add more items as needed
];

const ProductCard = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.offerItemGrid}
      onPress={() =>
        router.push({
          pathname: `/details/${item.id}`,
          params: {
            id: item.id,
          },
        })
      }
    >
      <View
        style={{
          backgroundColor: "#f5f5f5",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          height: 170,
        }}
      >
        <Image source={item.image} style={styles.offerImage} />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <Text style={styles.offerProduct}>{item.product}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",

            alignItems: "center",
          }}
        >
          <Text style={styles.offerPrice}>{item.price}</Text>
          <View style={styles.offerTimeContainer}>
            <Ionicons name="time-outline" size={16} color="#88" />
            <Text style={styles.offerTime}>{item.time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  offerItemGrid: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 16,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 5,
    width: "48%", // Adjust the width for grid layout
  },
  offerImage: {
    height: 100,
    resizeMode: "contain",
    marginVertical: 8,
  },
  offerPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4caf50",
    textAlign: "left",
    marginVertical: 8,
  },
  offerTimeContainer: {
    flexDirection: "row",
    borderRadius: 12,
  },
  offerTime: {
    marginLeft: 4,
    fontSize: 12,
    color: "#888",
  },
  offerProduct: {
    fontSize: 12,
    textAlign: "left",
    marginVertical: 8,
    color: "#333",
  },
});

export default ProductCard;

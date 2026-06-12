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
import { Icons, Images } from "@/constants/Images"; // Ensure correct paths

// Define prop types for better type checking
interface ProductCardProps {
  item: {
    id: string;
    image: any; // Adjust the type as needed
    product: string;
    price: string;
    quantity: number;
    time: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.offerItemGrid}
      onPress={() =>
        router.push({
          pathname: `/details/${item.id}`,
          params: { id: item.id },
        })
      }
    >
      <View style={styles.imageContainer}>
        <View style={styles.offerIconContainer}>
          <Image source={Icons.heart} style={styles.offerIcon} />
        </View>
        <Image source={item.image} style={styles.offerImage} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.offerProduct}>{item.product}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.offerPrice}>{item.price}</Text>
          <View style={styles.stockContainer}>
            <Ionicons name="extension-puzzle-outline" size={14} color="black" />
            <Text style={styles.stockText}>{item.quantity} in stock</Text>
          </View>
          <View style={styles.offerTimeContainer}>
            <Ionicons name="time-outline" size={12} color="#88" />
            <Text style={styles.offerTime}>{item.time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  offerItemGrid: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 16,
    width: "48%", // Adjust the width for grid layout
  },
  imageContainer: {
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 170,
  },
  offerIconContainer: {
    position: "absolute",
    top: 8,
    right: 10,
    alignSelf: "flex-end",
  },
  offerIcon: {
    width: 24,
    height: 24,
  },
  offerImage: {
    height: 100,
    resizeMode: "contain",
    marginVertical: 8,
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  offerProduct: {
    fontSize: 12,
    color: "#333",
    marginVertical: 8,
  },
  offerPrice: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4caf50",
    textAlign: "left",
    marginVertical: 8,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stockContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stockText: {
    fontSize: 10,
    marginLeft: 2,
  },
  offerTimeContainer: {
    flexDirection: "row",
    borderRadius: 12,
    alignItems: "center",
  },
  offerTime: {
    marginLeft: 4,
    fontSize: 12,
    color: "#888",
  },
});

export default ProductCard;

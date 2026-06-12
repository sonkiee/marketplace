import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Images } from "@/constants/Images";
import ProductCard from "@/components/ProductCard";

const offers = [
  {
    id: "1",
    price: "₦12,000",
    time: "20 mins",
    product: "NIKE - Green Summer Kicks",
    image: Images.nike,
  },
  {
    id: "2",
    price: "₦12,000",
    time: "20 mins",
    product: "V-neck Denim Jacket",
    image: Images.neck,
  },
  {
    id: "3",
    price: "₦12,000",
    time: "20 mins",
    product: "Mens Winter sweater",
    image: Images.shirt,
  },
  {
    id: "4",
    price: "₦12,000",
    time: "20 mins",
    product: "Glycolic acid 7% for hyperpigmentation",
    image: Images.heels,
  },
  // Add more items as needed
];

const Skincare = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skincare Offers</Text>
      <FlatList
        data={offers}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.offerListGrid}
      />
    </View>
  );
};

export default Skincare;

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

import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { Images } from "@/constants/Images";

import FavoriteCard from "@/components/FavoriteCard";

const offers = [
  {
    id: "1",
    price: "₦12,000",
    time: "20 mins",
    product: "NIKE - Green Summer Kicks",
    image: Images.nike,
    qty: 1,
  },
  {
    id: "2",
    price: "₦12,000",
    time: "20 mins",
    product: "V-neck Denim Jacket",
    image: Images.neck,
    qty: 1,
  },
  {
    id: "3",
    price: "₦12,000",
    time: "20 mins",
    product: "Mens Winter sweater",
    image: Images.shirt,
    qty: 1,
  },
  {
    id: "4",
    price: "₦12,000",
    time: "20 mins",
    product: "Glycolic acid 7% for hyperpigmentation",
    image: Images.heels,
    qty: 1,
  },
  // Add more items as needed
];

const SavedItemsScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={offers}
        renderItem={({ item }) => <FavoriteCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.offerListGrid}
      />
    </View>
  );
};

export default SavedItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
});

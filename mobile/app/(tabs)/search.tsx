import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Images } from "@/constants/Images";
import ProductCard from "@/components/ProductCard";
import CustomSearch from "@/components/CustomSearch";
import { MaterialIcons } from "@expo/vector-icons";

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

const Search = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Explore</Text>
              <Text style={styles.subtitle}>
                Get a quick glimpse of new vendors and search through our
                diverse catalog of products.
              </Text>
            </View>
            <View style={styles.searchContainer}>
              <CustomSearch
                containerStyle={{
                  width: "95%",
                }}
                value={searchText}
                placeholder="Search for anything..."
                handleChangeText={(text) => setSearchText(text)}
              />
              <View style={styles.sortButton}>
                <MaterialIcons name="sort" size={24} color="black" />
              </View>
            </View>
            <Text style={styles.sectionTitle}>Top vendors</Text>
            <Image source={Images.vendorone} style={styles.searchBackground} />
            <Text style={styles.vendorText}>More by this vendor</Text>
          </>
        }
        ListEmptyComponent={
          <View>
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No offers found.
            </Text>
          </View>
        }
        ListFooterComponent={
          <>
            <Image source={Images.vendortwo} style={styles.searchBackground} />
            <Text style={styles.vendorText}>More by this vendor</Text>
            <FlatList
              data={offers}
              renderItem={({ item }) => <ProductCard item={item} />}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.offerListGrid}
            />
          </>
        }
        data={offers}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.offerListGrid}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 10,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  sortButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  offerListGrid: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    paddingVertical: 10,
  },
  sectionTitle: {
    marginVertical: 5,
    marginHorizontal: 16,
    fontWeight: "600",
    fontSize: 16,
  },
  vendorText: {
    marginVertical: 5,
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});

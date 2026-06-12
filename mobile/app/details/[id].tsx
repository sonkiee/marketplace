import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React from "react";
import ProductCard from "@/components/ProductCard";
import { Images } from "@/constants/Images";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Review from "@/components/Review";
import { router } from "expo-router";

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
  {
    id: "3",
    price: "₦12,000",
    time: "20 mins",
    product: "Glycolic acid 7% for hyperpigmentation",
    image: Images.product,
  },
  {
    id: "4",
    price: "₦12,000",
    time: "20 mins",
    product: "Glycolic acid 7% for hyperpigmentation",
    image: Images.product,
  },
  // Add more items as needed
];

const product = {
  id: "1",
  name: "NIKE",
  subtitle: "Green Summer Kicks",
  description:
    "Sneakers are made for exercise and sports, but they're aslo very popular everyday shoes because they're so comfortable ",
  rating: 4.8,
  reviews: 25,
  price: 12000,
  oldPrice: 24000,
  discount: 50,
  image: Images.chopper,
  time: "20 mins",
  distance: "300m",
};

const Details = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponentStyle={{
          padding: 0,
          marginLeft: -5,
          paddingLeft: -5,
        }}
        ListHeaderComponent={
          <>
            <Image
              source={product.image}
              style={styles.productImage}
              accessibilityLabel={`Image of ${product.name}`}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDescription}>{product.subtitle}</Text>
              <View style={styles.productRating}>
                <Ionicons
                  name="star"
                  size={14}
                  color="red"
                  accessibilityLabel={`Rating: ${product.rating}`}
                />
                <Text
                  style={{
                    fontSize: 13,
                    gap: 3,
                    marginHorizontal: 6,
                    color: "#AC8521",
                  }}
                >
                  {product.rating} ({product.reviews} reviews)
                </Text>
                <Text style={styles.productPrice}>
                  ₦{product.price.toLocaleString()}{" "}
                  <Text style={styles.oldPrice}>
                    ₦{product.oldPrice.toLocaleString()}
                  </Text>{" "}
                  <Text
                    style={{
                      backgroundColor: "#40C1454D",
                      padding: 5,
                      borderRadius: 20,
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    (-{product.discount}%)
                  </Text>
                </Text>
              </View>

              <View style={styles.productInfo}>
                <View
                  style={[
                    styles.productInfo,
                    {
                      backgroundColor: "#E5C2C840",
                      padding: 3,
                      borderRadius: 8,
                    },
                  ]}
                >
                  <Ionicons name="time-outline" size={10} color="black" />
                  <Text style={{ fontSize: 10, marginLeft: 2 }}>
                    {product.time}
                  </Text>
                </View>
                <View
                  style={[
                    styles.productInfo,
                    {
                      backgroundColor: "#E5C2C840",
                      padding: 3,
                      borderRadius: 8,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="moped-electric"
                    size={10}
                    color="black"
                  />
                  <Text style={{ fontSize: 10 }}>{product.distance}</Text>
                </View>
              </View>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Details</Text>
                <Text style={styles.sectionText}>{product.description}</Text>
              </View>
            </View>

            <Review />

            <View style={styles.moreLikeThisSection}>
              <Text style={styles.sectionTitle}>More like this</Text>
            </View>
          </>
        }
        data={offers}
        renderItem={(item) => <ProductCard item={item.item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.offerListGrid}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.favorite}>
          <Ionicons
            name="heart-outline"
            size={24}
            color="black"
            accessibilityLabel="Add to favorites"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.navigate("/cart")}
          style={styles.addToCartButton}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  offerListGrid: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  productDetails: {
    padding: 16,
  },
  productName: {
    fontSize: 14,
    color: "#333",
  },
  productDescription: {
    fontSize: 15,
    color: "#888",
    fontWeight: "500",
  },
  productRating: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    padding: 2,
  },
  moreLikeThisSection: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionText: {
    paddingVertical: 10,
    color: "#888",
    lineHeight: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  addToCartButton: {
    backgroundColor: "black",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    width: "75%",
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 16,
  },
  favorite: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitleContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
    paddingBottom: 8,
    marginBottom: 10,
  },
});

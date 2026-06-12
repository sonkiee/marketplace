// HomeScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Icons, Images, carouselImages } from "@/constants/Images";
import CategoryCard from "@/components/CategoryCard";
import Carousel from "react-native-reanimated-carousel";
import CustomSearch from "@/components/CustomSearch";
import ProductCard from "@/components/ProductCard";

const width = Dimensions.get("window").width;

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

const HomeScreen = () => {
  const [searchText, setSearchText] = React.useState<string>("");

  const renderPopularItem = ({ item }: { item: any }) => (
    <ProductCard item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        ListHeaderComponentStyle={styles.headerListHeader}
        ListHeaderComponent={
          <>
            <View>
              <View style={styles.headerContainer}>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.greeting}>Location</Text>
                  <View style={styles.locationContainer}>
                    <Ionicons name="location" size={20} color="black" />
                    <Text style={styles.name}>Wuse 2, Abuja</Text>
                    <Ionicons name="chevron-down" size={20} color="black" />
                  </View>
                </View>
                <View style={styles.headerIconsContainer}>
                  <TouchableOpacity
                    onPress={() => router.navigate("/notification")}
                  >
                    <Ionicons name="notifications" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.navigate("/saved-items")}
                  >
                    <Image
                      source={Icons.heart}
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <CustomSearch
                value={searchText}
                placeholder="Search for anything..."
                handleChangeText={setSearchText}
                onPress={() => router.navigate("/search", { searchText })}
              />
              <View style={styles.separator} />
            </View>

            <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay
              data={carouselImages}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Image source={item} style={styles.image} />
                </View>
              )}
            />

            <View style={styles.categoriesContainer}>
              <View style={styles.categoriesHeader}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <TouchableOpacity
                  onPress={() => router.navigate("/categories")}
                  accessibilityLabel="See all categories"
                >
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={data}
                renderItem={({ item }) => <CategoryCard item={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
              />
            </View>

            <View style={styles.offersContainer}>
              <Text style={styles.sectionTitle}>Nearby offers</Text>
              <FlatList
                data={offers}
                renderItem={renderPopularItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.offerListGrid}
              />
            </View>
          </>
        }
        data={offers}
        renderItem={renderPopularItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.offerListGrid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 25,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  greeting: {
    fontSize: 14,
    color: "#888",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    gap: 5,
  },
  headerIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    gap: 15,
  },
  separator: {
    marginVertical: 10,
  },
  categoriesContainer: {
    marginTop: 24,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "500",
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  offersContainer: {
    marginTop: 24,
  },
  offerListGrid: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerListHeader: {
    padding: 0,
    marginLeft: -5,
    paddingLeft: -5,
  },
  itemContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: width / 2,
    resizeMode: "cover",
  },
});

export default HomeScreen;

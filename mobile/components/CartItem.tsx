import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Images } from "@/constants/Images";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export const CartItem = ({ item }) => (
  <View style={styles.cartItem}>
    <Image source={item.image} style={styles.itemImage} />
    <View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>₦{item.price}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
        }}
      >
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
            <Text style={{ fontSize: 10, marginLeft: 2 }}> 20 mins </Text>
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
            <Text style={{ fontSize: 10 }}> 300 </Text>
          </View>
        </View>
        <View style={styles.quantityControl}>
          <TouchableOpacity style={styles.quantityButton}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  itemImage: {
    width: 60,
    height: 65,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    resizeMode: "contain",
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "100%",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "green",
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 8,
    padding: 2,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 18,
    width: 80,
    height: 30,
    paddingHorizontal: 8,
  },
  // quantityButton: {
  //   backgroundColor: "#eee",
  //   borderRadius: 4,
  // },
  quantityText: {
    marginHorizontal: 8,
  },
});

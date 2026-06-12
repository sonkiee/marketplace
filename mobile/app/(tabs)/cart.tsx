import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Images } from "@/constants/Images";
import { router } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Cart = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
        </View>

        <CartItem
          image={Images.heels}
          title="Gucci Heels"
          price={12000}
          quantity={1}
        />

        <CartItem
          image={Images.product}
          title="Ordinary toner"
          price={12000}
          quantity={1}
        />

        <View style={styles.couponContainer}>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={24}
            color="black"
          />
          <TextInput
            style={styles.couponInput}
            placeholder="Add coupon code here"
            placeholderTextColor="#888"
          />
          <Text style={styles.discountText}>-50%</Text>
        </View>

        <View style={styles.summaryContainer}>
          <SummaryItem title="Subtotal" value="₦22,000" />
          <SummaryItem title="VAT" value="₦50" />
          <SummaryItem title="Delivery fee" value="₦600" />
          <SummaryItem title="Total delivery time" value="60 mins." isTime />
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>₦22,650</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.navigate("/check-out")}
          style={styles.checkoutButton}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const CartItem = ({ image, title, price, quantity }) => (
  <View style={styles.cartItem}>
    <Image source={image} style={styles.itemImage} />
    <View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemPrice}>₦{price}</Text>
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
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const SummaryItem = ({ title, value, isTime }) => (
  <View style={styles.summaryItem}>
    <Text style={styles.summaryTitle}>{title}</Text>
    <Text style={[styles.summaryValue, isTime && styles.timeValue]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  cartItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
  couponContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffebee",
    alignItems: "center",
    marginHorizontal: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  couponInput: {
    flex: 1,
    padding: 8,
    color: "black",
    backgroundColor: "#ffebee",
    borderRadius: 4,
  },
  discountText: {
    marginLeft: 16,
    color: "green",
  },
  summaryContainer: {
    padding: 16,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    fontWeight: "700",
  },
  timeValue: {
    color: "green",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "red",
    padding: 16,
    alignItems: "center",
    margin: 16,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryTitle: {
    fontWeight: "500",
  },
  summaryValue: {
    fontWeight: "700",
    color: "green",
  },
});

export default Cart;

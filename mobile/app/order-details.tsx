import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Octicons, FontAwesome } from "@expo/vector-icons";
import { Images } from "@/constants/Images";
import CartItem from "@/components/CartItem";

const OrderDetail = () => {
  const orderStatus = [
    {
      status: "Ordered placed",
      time: "08:23am, June 20, 2024",
      isComplete: true,
    },
    {
      status: "In progress",
      time: "Your order will be delivered in the next 20mins",
      isComplete: true,
    },
    {
      status: "Delivery",
      time: "Estimated delivery date: Today, 40 mins",
      isComplete: true,
    },
    {
      status: "Item Received",
      time: "Estimated delivery date: Today, 40 mins",
      isComplete: true,
    },
  ];

  const products = [
    {
      id: "1",
      name: "Gucci Heels",
      price: "₦12,000",
      image: Images.heels,
    },
    {
      id: "2",
      name: "Ordinary toner",
      price: "₦12,000",
      image: Images.product,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.orderNumber}>Order #5643WAQ2A</Text>

            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CartItem item={item} />}
            />

            <Text style={styles.paymentSummaryTitle}>Payment summary</Text>
            <View style={styles.paymentSummary}>
              <Text style={styles.paymentSummaryText}>Order to:</Text>
              <Text style={styles.paymentSummaryText}>
                27 Plato avenue Kubwa, Abuja
              </Text>
              <Text style={styles.paymentSummaryText}>Method:</Text>
              <Text style={styles.paymentSummaryText}>VISA **** 4321</Text>
            </View>
          </>
        }
        data={products}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <View style={styles.statusContainer}>
            {orderStatus.map((item, index) => (
              <View key={index} style={styles.statusItem}>
                <Octicons
                  name="dot-fill"
                  size={24}
                  color={item.isComplete ? "#33A3E2" : "gray"}
                />
                <View style={styles.statusTextContainer}>
                  <Text style={styles.statusTitle}>{item.status}</Text>
                  <Text style={styles.statusTime}>{item.time}</Text>
                  {item.status === "In progress" && (
                    <TouchableOpacity
                      onPress={() => console.log("Status clicked")}
                      style={styles.callDeliveryButton}
                      accessibilityLabel="Call Delivery"
                    >
                      <FontAwesome name="phone" size={20} color="black" />
                      <Text style={styles.callDeliveryText}>Call Delivery</Text>
                    </TouchableOpacity>
                  )}
                </View>
                {index < orderStatus.length - 1 && (
                  <View
                    style={[
                      styles.verticalLine,
                      { height: index === 1 ? 150 : 100, top: 24 },
                    ]}
                  />
                )}
              </View>
            ))}
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 16,
  },
  statusContainer: {
    marginHorizontal: 16,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusTextContainer: {
    marginLeft: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 5,
  },
  statusTime: {
    fontSize: 13,
    color: "#666",
  },
  verticalLine: {
    width: 1,
    backgroundColor: "#cccccc",
    position: "absolute",
    left: 5,
    zIndex: -1,
  },
  paymentSummaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  paymentSummary: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  paymentSummaryText: {
    fontSize: 16,
    marginBottom: 4,
  },
  orderedProductsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  callDeliveryButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "green",
    width: 150,
  },
  callDeliveryText: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default OrderDetail;

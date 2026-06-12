import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Icons } from "@/constants/Images";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("visa");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <Header /> */}
        <DeliveryAddress />
        <PaymentMethod
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />
        <OrderNote />
        <PayButton />
      </ScrollView>
    </SafeAreaView>
  );
};

const Header = () => (
  <View style={styles.header}>
    <TouchableOpacity>
      <Icon name="arrow-back" size={24} color="#000" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Checkout</Text>
  </View>
);

const DeliveryAddress = () => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Delivery address</Text>
      <TouchableOpacity>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.addressCard}>
      <Icon name="location-on" size={24} color="#000" />
      <View style={styles.addressInfo}>
        <Text style={styles.addressType}>Home</Text>
        <Text style={styles.address}>27 Plato avenue Kubwa, Abuja</Text>
      </View>
      <Icon name="keyboard-arrow-down" size={24} color="#000" />
    </TouchableOpacity>
  </View>
);

const PaymentMethod = ({ selectedPayment, setSelectedPayment }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Payment method</Text>
      <TouchableOpacity>
        <Text style={styles.editText}>Add a card</Text>
      </TouchableOpacity>
    </View>
    <PaymentOption
      icon="credit-card"
      title="Visa"
      subtitle="**** 7890"
      isSelected={selectedPayment === "visa"}
      onSelect={() => setSelectedPayment("visa")}
    />
    <PaymentOption
      icon="account-balance"
      title="Bank transfer"
      isSelected={selectedPayment === "bank"}
      onSelect={() => setSelectedPayment("bank")}
    />
    <PaymentOption
      icon="local-shipping"
      title="Pay on delivery"
      isSelected={selectedPayment === "cod"}
      onSelect={() => setSelectedPayment("cod")}
    />
  </View>
);

const PaymentOption = ({ icon, title, subtitle, isSelected, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.paymentOption,
      isSelected && { borderWidth: 1, borderColor: "#4CAF50", borderRadius: 8 },
    ]}
    onPress={onSelect}
  >
    <Icon name={icon} size={24} color="#000" />
    <View style={styles.paymentInfo}>
      <Text style={styles.paymentTitle}>{title}</Text>
      {subtitle && <Text style={styles.paymentSubtitle}>{subtitle}</Text>}
    </View>
    {isSelected && <Image source={Icons.checked} />}
  </TouchableOpacity>
);

const OrderNote = () => (
  <View style={styles.orderNote}>
    <Text style={styles.orderNoteText}>
      Please note that all orders are typically within 30-40 mins. Once your
      order has been processed and packaged, you will receive a confirmation
      email with tracking information.
    </Text>
  </View>
);

const PayButton = () => (
  <TouchableOpacity
    onPress={() => router.push("/add-card")}
    style={styles.payButton}
  >
    <Text style={styles.payButtonText}>Pay for Order</Text>
  </TouchableOpacity>
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
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  editText: {
    color: "#888",
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addressInfo: {
    flex: 1,
    marginLeft: 12,
  },
  addressType: {
    fontWeight: "bold",
  },
  address: {
    color: "#666",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentTitle: {
    fontWeight: "bold",
  },
  paymentSubtitle: {
    color: "#666",
  },
  orderNote: {
    padding: 16,
  },
  orderNoteText: {
    color: "#666",
    lineHeight: 20,
  },
  payButton: {
    backgroundColor: "#FF0000",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: "center",
  },
  payButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Checkout;

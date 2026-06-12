import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const AddCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add a Card</Text>
      </View>

      <View style={styles.cardInputContainer}>
        <View style={styles.cardNumberContainer}>
          <Icon
            name="credit-card"
            size={24}
            color="#000"
            style={styles.cardIcon}
          />
          <TextInput
            style={styles.cardNumberInput}
            placeholder="**** **** **** ****"
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholderTextColor="#888"
            keyboardType="numeric"
          />
          <Text style={styles.visaText}>VISA</Text>
        </View>
      </View>

      <View style={styles.additionalInputs}>
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          placeholderTextColor="#888"
          value={expiry}
          onChangeText={setExpiry}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          placeholderTextColor="#888"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.infoText}>
        Paystack may charge a small amount to confirm your card details . This
        might be immediately refunded.{" "}
        <Text style={styles.learnMore}>Learn More</Text>
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/verify-code")}
        style={styles.confirmButton}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
  cardInputContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  cardNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
  },
  cardIcon: {
    marginRight: 10,
  },
  cardNumberInput: {
    flex: 1,
    fontSize: 16,
  },
  visaText: {
    fontWeight: "bold",
  },
  additionalInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  input: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  infoText: {
    marginTop: 20,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  learnMore: {
    color: "red",
  },
  confirmButton: {
    backgroundColor: "red",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  confirmButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddCard;

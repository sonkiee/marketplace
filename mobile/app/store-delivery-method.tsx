import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { router } from "expo-router";
import { Icons } from "@/constants/Images";

const ShippingAndDelivery = () => {
  const [formData, setFormData] = useState({
    selectedCategory: null,
    selectedZone: null,
    selectedCost: null,
    selectedDay: null,
    rakayaDelivery: false,
  });

  const categories = [
    { label: "Electronics", value: "electronics" },
    { label: "Clothing", value: "clothing" },
    { label: "Books", value: "books" },
    { label: "Furniture", value: "furniture" },
  ];

  const zones = [{ label: "South - south", value: "South - south" }];

  const cost = [
    { label: "N200 - N500", value: "N200 - N500" },
    { label: "N500 - N1000", value: "N500 - N1000" },
    { label: "N1000 - N1500", value: "N1000 - N1500" },
    { label: "N1500 - N2000", value: "N1500 - N2000" },
  ];

  const days = [
    { label: "Same-day", value: "Same-day" },
    { label: "Next-day", value: "Next-day" },
    { label: "Two-day", value: "Two-day" },
  ];

  const handleToggle = () => {
    setFormData({ ...formData, rakayaDelivery: !formData.rakayaDelivery });
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select shipping zones</Text>
        <RNPickerSelect
          Icon={() => <Ionicons name="chevron-down" size={24} color="black" />}
          placeholder={{ label: "Select category", value: null }}
          items={categories}
          onValueChange={(value) =>
            setFormData({ ...formData, selectedZone: value })
          }
          value={formData.selectedZone}
          style={pickerStyles}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select shipping cost</Text>
        <RNPickerSelect
          Icon={() => <Ionicons name="chevron-down" size={24} color="black" />}
          placeholder={{ label: "Select cost", value: null }}
          items={cost}
          onValueChange={(value) =>
            setFormData({ ...formData, selectedCost: value })
          }
          value={formData.selectedCost}
          style={pickerStyles}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Delivery day</Text>
        <RNPickerSelect
          Icon={() => <Ionicons name="chevron-down" size={24} color="black" />}
          placeholder={{ label: "Select day", value: null }}
          items={days}
          onValueChange={(value) =>
            setFormData({ ...formData, selectedDay: value })
          }
          value={formData.selectedDay}
          style={pickerStyles}
        />
      </View>

      <TouchableOpacity onPress={handleToggle} style={styles.toggleContainer}>
        <View>
          <Text style={styles.toggleTitle}>Delivery with Rakaya</Text>
          <Text style={styles.toggleSubtitle}>
            Use Rakaya delivery to route items to customers
          </Text>
        </View>
        <Image
          source={formData.rakayaDelivery ? Icons.checked : Icons.unchecked}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.navigate("/store-payment")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const pickerStyles = StyleSheet.create({
  inputIOS: {
    padding: 5,
    borderRadius: 5,
    color: "#3b3b3b",
  },
  inputAndroid: {
    padding: 5,
    borderRadius: 5,
    color: "#3b3b3b",
  },
  placeholder: {
    color: "#888",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "#d1ffd0",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    paddingVertical: 18,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#green",
  },
  toggleTitle: {
    fontWeight: "bold",
  },
  toggleSubtitle: {
    fontSize: 12,
    color: "gray",
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  dropdownContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 12,
  },
  dropdownLabel: {
    marginBottom: 5,
    fontWeight: "500",
  },
});

export default ShippingAndDelivery;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ShippingAndDeliveryScreen = () => {
  const [isRakayaEnabled, setIsRakayaEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shipping and delivery</Text>
      </View>

      <View style={styles.content}>
        <DropdownItem title="Select shipping zones" value="South-south" />
        <DropdownItem title="Select shippingcost" value="N200- N500" />
        <DropdownItem title="Delivery day" value="Same-day" />

        <View style={styles.rakayaOption}>
          <View>
            <Text style={styles.rakayaTitle}>Delivery with Rakaya</Text>
            <Text style={styles.rakayaDescription}>
              Use Rakaya delivery to route items to customers
            </Text>
          </View>
          <Switch
            value={isRakayaEnabled}
            onValueChange={setIsRakayaEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isRakayaEnabled ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const DropdownItem = ({ title, value }) => (
  <TouchableOpacity style={styles.dropdownItem}>
    <Text style={styles.dropdownTitle}>{title}</Text>
    <View style={styles.dropdownValue}>
      <Text>{value}</Text>
      <Icon name="keyboard-arrow-down" size={24} color="#000" />
    </View>
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
  content: {
    padding: 16,
  },
  dropdownItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  dropdownTitle: {
    color: "#888",
    marginBottom: 4,
  },
  dropdownValue: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rakayaOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  rakayaTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  rakayaDescription: {
    color: "#888",
    fontSize: 12,
  },
});

export default ShippingAndDeliveryScreen;

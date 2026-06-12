import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { Icons, Images } from "@/constants/Images";
import CustomInput from "@/components/CustomInput";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";

const categories = [
  { label: "Gadgets", value: "Gadgets" },
  { label: "Electronics", value: "Electronics" },
  { label: "Clothing", value: "Clothing" },
  { label: "Books", value: "Books" },
  { label: "Furniture", value: "Furniture" },
];

const cost = [
  { label: "N200 - N500", value: "N200 - N500" },
  { label: "N500 - N1000", value: "N500 - N1000" },
  { label: "N1000 - N2000", value: "N1000 - N2000" },
];

const days = [
  { label: "Same-day", value: "Same-day" },
  { label: "Next-day", value: "Next-day" },
  { label: "2-3 days", value: "2-3 days" },
  { label: "1 week", value: "1 week" },
];

const shippingZones = [
  { label: "South-south", value: "South-south" },
  { label: "South-west", value: "South-west" },
  { label: "North-central", value: "North-central" },
  { label: "North-east", value: "North-east" },
];

const StoreReview = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    productName: "",
    productDescription: "",
    selectedCategory: null,
    selectedZone: null,
    selectedCost: null,
    selectedDay: null,
    quantity: "",
    size: "",
    color: "",
    shippingZone: "South-south",
    shippingCost: "N200- N500",
    deliveryDay: "Same-day",
    rakayaDelivery: false,
    paymentMethod: "visa",
  });

  const [isEditable, setIsEditable] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("visa");

  const handleToggle = () => {
    setFormData({ ...formData, rakayaDelivery: !formData.rakayaDelivery });
  };

  const handleFinish = () => {
    Alert.alert(
      "Review and confirm your store setup",
      "Are you sure you want to review and confirm your store setup?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            Alert.alert("Store setup confirmed!");
            setTimeout(() => router.push("/home"), 2000); // Navigate to home
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            borderWidth: 1,
            borderColor: "pink",
            borderRadius: 12,
            padding: 6,
          }}
        >
          <TouchableOpacity onPress={() => setIsEditable(!isEditable)}>
            <Text style={styles.editLink}>Edit Store Info. </Text>
          </TouchableOpacity>
          <Image
            source={Icons.edit}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>

      <Text style={styles.label}>Store name</Text>
      <CustomInput
        placeholder="Enter store name"
        placeholderTextColor="#ddd"
        value={formData.storeName}
        containerStyle={{ borderColor: "#ccc" }}
        handleChangeText={(text) =>
          setFormData({ ...formData, storeName: text })
        }
        editable={isEditable}
      />

      <Text style={styles.label}>Description</Text>
      <CustomInput
        placeholder="Store description here..."
        value={formData.storeDescription}
        placeholderTextColor="#ddd"
        handleChangeText={(text) =>
          setFormData({ ...formData, storeDescription: text })
        }
        containerStyle={{ height: 150, borderColor: "#ccc" }}
        textInputStyle={{ height: 150, textAlignVertical: "top" }}
        multiline
        editable={isEditable}
      />

      <Image source={Images.rectangle} style={styles.image} />

      <Text style={styles.label}>Product name</Text>
      <CustomInput
        placeholder="Enter product name"
        value={formData.productName}
        containerStyle={{ borderColor: "#ddd" }}
        placeholderTextColor="#ddd"
        handleChangeText={(text) =>
          setFormData({ ...formData, productName: text })
        }
        editable={isEditable}
      />

      <Text style={styles.label}>Product description</Text>
      <CustomInput
        placeholder="Product description here..."
        placeholderTextColor="#ddd"
        value={formData.productDescription}
        handleChangeText={(text) =>
          setFormData({ ...formData, productDescription: text })
        }
        containerStyle={{ height: 150, borderColor: "#ccc" }}
        textInputStyle={{ height: 150, textAlignVertical: "top" }}
        multiline
        editable={isEditable}
      />

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Choose a category</Text>
        <RNPickerSelect
          placeholder={{ label: "Select category", value: null }}
          items={categories}
          onValueChange={(value) =>
            setFormData({ ...formData, selectedCategory: value })
          }
          value={formData.selectedCategory}
          style={pickerStyles}
          disabled={!isEditable}
        />
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.optionBox}>
          <Text style={styles.optionLabel}>Quantity</Text>
          <CustomInput
            placeholder="50"
            containerStyle={styles.optionInput}
            value={formData.quantity}
            handleChangeText={(text) =>
              setFormData({ ...formData, quantity: text })
            }
            editable={isEditable}
          />
        </View>
        <View style={styles.optionBox}>
          <Text style={styles.optionLabel}>Size</Text>
          <CustomInput
            placeholder="N/A"
            value={formData.size}
            containerStyle={styles.optionInput}
            handleChangeText={(text) =>
              setFormData({ ...formData, size: text })
            }
            editable={isEditable}
          />
        </View>
        <View style={styles.optionBox}>
          <Text style={styles.optionLabel}>Color</Text>
          <CustomInput
            placeholder="Red"
            containerStyle={styles.optionInput}
            value={formData.color}
            handleChangeText={(text) =>
              setFormData({ ...formData, color: text })
            }
            editable={isEditable}
          />
        </View>
      </View>

      <View style={styles.uploadContainer}>
        <Text style={styles.uploadText}>Upload product image (Optional)</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select shipping zones</Text>
        <RNPickerSelect
          Icon={() => <Ionicons name="chevron-down" size={24} color="black" />}
          placeholder={{ label: "Select zone", value: null }}
          items={shippingZones}
          onValueChange={(value) =>
            setFormData({ ...formData, selectedZone: value })
          }
          value={formData.selectedZone}
          style={pickerStyles}
          disabled={!isEditable}
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
          disabled={!isEditable}
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
          disabled={!isEditable}
        />
      </View>

      <TouchableOpacity onPress={handleToggle} style={styles.toggleContainer}>
        <View>
          <Text style={styles.toggleTitle}>Delivery with Rakaya</Text>
          <Text style={styles.toggleSubtitle}>
            Use Rakaya delivery to route items to customers
          </Text>
        </View>
        <MaterialIcons
          name={
            formData.rakayaDelivery
              ? "radio-button-checked"
              : "radio-button-unchecked"
          }
          size={24}
          color={formData.rakayaDelivery ? "green" : "gray"}
        />
      </TouchableOpacity>

      <PaymentMethod
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />

      <View style={styles.orderNote}>
        <Text style={styles.orderNoteText}>
          Please note that you can easily change your payment options. Once your
          order has been processed and packaged, you will receive a confirmation
          email with tracking information.
        </Text>
      </View>

      <CustomButton handlePress={handleFinish} title="Finish" />
    </ScrollView>
  );
};

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
    {isSelected && (
      <MaterialIcons name="radio-button-checked" size={24} color="#4CAF50" />
    )}
  </TouchableOpacity>
);

const pickerStyles = StyleSheet.create({
  inputIOS: {
    paddingVertical: 5,
    borderRadius: 5,
    color: "#3b3b3b",
  },
  inputAndroid: {
    paddingVertical: 5,
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
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    position: "relative",
    alignItems: "flex-end",
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  editLink: {
    color: "pink",
  },
  label: {
    marginBottom: 5,
    fontWeight: "500",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },

  dropdownContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  dropdownLabel: {
    marginBottom: 5,
    fontWeight: "500",
    fontSize: 13,
  },

  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  optionBox: {
    flex: 1,
    marginHorizontal: 5,
  },
  optionLabel: {
    marginBottom: 5,
    fontWeight: "500",
  },
  optionInput: {
    borderColor: "#f5f5f5",
    backgroundColor: "#f5f5f5",
  },

  orderNoteText: {
    color: "#666",
    lineHeight: 20,
  },

  uploadContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    paddingVertical: 22,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 50,
  },
  uploadText: {
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    paddingVertical: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d1ffd0",
  },
  toggleTitle: {
    fontWeight: "bold",
  },
  toggleSubtitle: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
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
});

export default StoreReview;

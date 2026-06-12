import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import RNPickerSelect from "react-native-picker-select"; // Import the picker library
import { router } from "expo-router";
import ImageUpload from "@/components/ImageUpload";

const ProductSetup = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    selectedCategory: null,
    quantity: "",
    size: "",
    color: "",
  });

  const disabled =
    formData.storeName.trim() === "" || formData.storeDescription.trim() === "";

  // Dummy data for dropdown
  const categories = [
    { label: "Electronics", value: "electronics" },
    { label: "Clothing", value: "clothing" },
    { label: "Books", value: "books" },
    { label: "Furniture", value: "furniture" },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Product name</Text>
              <CustomInput
                placeholder="Enter product name"
                value={formData.storeName}
                containerStyle={{ borderColor: "#ddd" }}
                placeholderTextColor="#ddd"
                handleChangeText={(text) =>
                  setFormData({ ...formData, storeName: text })
                }
              />

              <Text style={styles.label}>Product description</Text>
              <CustomInput
                placeholder="Product description here..."
                placeholderTextColor="#ddd"
                value={formData.storeDescription}
                handleChangeText={(text) =>
                  setFormData({ ...formData, storeDescription: text })
                }
                containerStyle={{ height: 150, borderColor: "#ccc" }}
                textInputStyle={{ height: 150, textAlignVertical: "top" }}
                multiline
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
                  />
                </View>
              </View>

              {/* <View style={styles.uploadContainer}>
                <Text style={styles.uploadText}>
                  Upload product image (Optional)
                </Text>
                <TouchableOpacity style={styles.uploadButton}>
                  <Text style={styles.uploadButtonText}>Upload Image</Text>
                </TouchableOpacity>
              </View> */}

              <ImageUpload />
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={() => router.navigate("/store-delivery-method")}
            style={[styles.nextButton, disabled && styles.nextButtonDisabled]} // Apply additional style if disabled
            disabled={disabled}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

// Custom styles for the picker component
const pickerStyles = StyleSheet.create({
  inputIOS: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#3b3b3b",
  },
  inputAndroid: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
  },
  label: {
    marginBottom: 5,
    fontWeight: "500",
  },
  descriptionInput: {
    textAlignVertical: "top",
  },
  dropdownContainer: {
    marginTop: 20,
  },
  dropdownLabel: {
    marginBottom: 5,
    fontWeight: "500",
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
  nextButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  nextButtonDisabled: {
    backgroundColor: "#d3d3d3", // Change to a different color when disabled
  },
});

export default ProductSetup;

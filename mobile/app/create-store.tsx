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
} from "react-native";
import CustomInput from "@/components/CustomInput";
import { router } from "expo-router";
import ImageUpload from "@/components/ImageUpload";

const CreateStore = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
  });

  const disabled =
    formData.storeName.trim() === "" || formData.storeDescription.trim() === "";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          {/* <View style={styles.header}>
            <TouchableOpacity>
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Store Information</Text>
          </View> */}

          <View style={styles.formContainer}>
            <Text style={styles.label}>Store name</Text>
            <CustomInput
              placeholder="Enter store name"
              placeholderTextColor="#ddd"
              value={formData.storeName}
              containerStyle={{ borderColor: "#ccc" }}
              handleChangeText={(text) =>
                setFormData({ ...formData, storeName: text })
              }
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
            />

            {/* <View style={styles.uploadContainer}>
              <Text style={styles.uploadText}>
                Please upload your store logo (Optional)
              </Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>Upload file</Text>
              </TouchableOpacity>
            </View> */}

            <ImageUpload />
          </View>

          <TouchableOpacity
            onPress={() => router.navigate("/product-setup")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
    // height: 100, // Remove this line
  },
  uploadContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    paddingVertical: 22,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
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

export default CreateStore;

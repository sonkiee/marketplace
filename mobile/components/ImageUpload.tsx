import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.uploadContainer}>
      <Text style={styles.uploadText}>Upload product image (Optional)</Text>
      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
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
});

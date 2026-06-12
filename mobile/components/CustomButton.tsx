import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  disabled?: boolean; // Add disabled prop
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  disabled = false, // Default value for disabled is false
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={disabled ? 1 : 0.5} // Change activeOpacity based on disabled state
        style={[styles.button, disabled && styles.disabledButton]} // Apply disabled style if disabled
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: "100%", // Ensure the container takes up the full width
    paddingHorizontal: 20, // Optional: Add padding for button spacing
    marginVertical: 10, // Optional: Add vertical margin for spacing between buttons
  },
  button: {
    backgroundColor: "#FF002C",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: "100%", // Ensure the button takes up the full width
  },
  disabledButton: {
    backgroundColor: "#d3d3d3", // Grey color for disabled state
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

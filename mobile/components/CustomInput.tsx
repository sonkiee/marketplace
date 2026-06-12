import {
  StyleSheet,
  Image,
  TextInput,
  View,
  TextInputProps,
  ImageSourcePropType,
} from "react-native";
import React, { useState } from "react";

// Define the props interface
interface CustomInputProps extends TextInputProps {
  title?: string;
  value: string;
  icon: ImageSourcePropType;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  containerStyle?: object;
  textInputStyle?: object;
}

const CustomInput: React.FC<CustomInputProps> = ({
  title,
  value,
  placeholder,
  icon,
  handleChangeText,
  containerStyle,
  textInputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { borderColor: isFocused ? "blue" : "#3b3b3b" }, // Change border color based on focus
        containerStyle, // Apply additional container styles
      ]}
    >
      {icon && <Image source={icon} style={styles.icon} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#3b3b3b"
        onChangeText={handleChangeText}
        value={value}
        style={[styles.textInput, textInputStyle]} // Apply additional textInput styles
        secureTextEntry={title === "password"} // Show password input when title is "password"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    height: 50,
    flexDirection: "row",
    borderColor: "#f5f5f5",
    backgroundColor: "#ffffff",
  },
  textInput: {
    padding: 10,
    fontSize: 16,
    textAlign: "left",
    flex: 1,
    color: "#3b3b3b",
  },
  icon: {
    height: 25,
    width: 25,
    marginHorizontal: 10,
    resizeMode: "contain",
  },
});

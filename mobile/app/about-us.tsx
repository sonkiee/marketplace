import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const about = [
  {
    title: " What are we",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor urna nec neque congue, non finibus justo fermentum. Donec vel velit non metus efficitur posuere vel a lectus. Sed tincidunt, ipsum sed consectetur bibendum, ligula lectus fermentum turpis, vel elementum urna felis a dolor. Morbi auctor, ipsum vel ultricies malesuada, felis neque tincidunt sapien, vel luctus velit ex nec nisl. Sed ut venenatis eros.",
  },
];

const AboutUsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {about.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.title}>{section.title}</Text>
            <Text style={styles.content}>{section.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});

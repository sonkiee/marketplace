import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const faq = [
  {
    title: "How do I set up a store?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel ipsum non lectus fauc.",
  },
  {
    title: "Do I sign up to make an order?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel ipsum non lectus fauc.",
  },
  {
    title: "What is Rakayar?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel ipsum non lectus fauc.",
  },
  {
    title: "How do I delete my account?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel ipsum non lectus fauc.",
  },
];

const FaqScreen = () => {
  const [visibleItems, setVisibleItems] = useState({});

  const toggleVisibility = (index) => {
    setVisibleItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {faq.map((item, index) => (
        <View key={item.title} style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleVisibility(index)}>
            <Text style={styles.faqTitle}>{item.title}</Text>
          </TouchableOpacity>
          {visibleItems[index] && (
            <Text style={styles.faqContent}>{item.content}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  faqContent: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
});

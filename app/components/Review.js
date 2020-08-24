import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Review() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>There are no reviews yet.</Text>
      <Text style={styles.title}>
        Only logged in customers who have purchased this product may leave a
        review.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 0.5,
    borderTopWidth: 0.5,
    padding: 20,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    color: "grey",
    textAlign: "justify",
    lineHeight: 25,
  },
});

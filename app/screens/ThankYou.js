import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ThankYou({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, color: "#4835bb", marginBottom: 20 }}>
        Thank you for the purchase.
      </Text>
      <Text style={{ fontSize: 20 }}>Hope you enjoy the course.</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ color: "#4835bb", fontSize: 20, marginTop: 20 }}>
          Explore More
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
});

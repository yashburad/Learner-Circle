import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RelatedProducts(props) {
  let details = props.element;
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.push("Course", { details });
      }}
      style={{ marginVertical: 10 }}
    >
      <Image
        style={styles.courseImage1}
        source={{ uri: props.element.images[0].src }}
      />
      <Text style={[styles.courseName, { marginVertical: 10 }]}>
        {props.element.name}
      </Text>
      <Text>Rs. {props.element.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  courseImage1: {
    width: "100%",
    height: 300,
  },
  courseName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

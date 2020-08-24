import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import HTMLView from "react-native-htmlview";

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>
        {title.id}.{title.title}
      </Text>
    </View>
  );
}

export default function Description(props) {
  return (
    <View style={styles.container}>
      <HTMLView value={props.html} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 0.5,
    borderTopWidth: 0.5,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    marginTop: 5,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    color: "grey",
    textAlign: "justify",
    lineHeight: 25,
  },
});

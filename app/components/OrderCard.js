import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function OrderCard(props) {
  return (
    <View style={styles.cards}>
      <Text style={styles.name}>{props.details.line_items[0].name}</Text>
      {props.details.line_items[0].meta_data.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <Text>{props.details.line_items[0].meta_data[0].value}</Text>
          <Text>{props.details.line_items[0].meta_data[1].value}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    backgroundColor: "white",
    padding: 15,
    borderColor: "gray",
    borderBottomWidth: 1,
  },
  name: { fontSize: 18, fontWeight: "bold" },
});

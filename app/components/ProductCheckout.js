import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProductCheckout(props) {
  return (
    <View>
      <View
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 18, flex: 1 }}>Product :</Text>
        <Text style={{ textAlign: "right", fontSize: 18, flex: 3 }}>
          {props.details.name} - {props.date}, {props.time} x 1
        </Text>
      </View>
      <View style={styles.ordertext}>
        <Text style={{ fontSize: 16 }}>Price:</Text>
        <Text style={styles.price}>Rs.{props.details.price}</Text>
      </View>
      <View style={styles.ordertext}>
        <Text style={{ fontSize: 16 }}>Checkout:</Text>
        <Text style={styles.price}>Rs.{props.details.price}</Text>
      </View>
      <View style={styles.ordertext}>
        <Text style={{ fontSize: 16 }}>Total:</Text>
        <Text style={styles.price}>Rs.{props.details.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ordertext: {
    flexDirection: "row",
    marginVertical: 10,
  },
  price: { textAlign: "right", flex: 1, fontSize: 16 },
});

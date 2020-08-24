import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MembershipCard(props) {
  // console.log(props.details);
  let name = "";
  if (props.details.plan_id === 987466562) {
    name = "Annual Plan";
  } else {
    name = "Monthly Plan";
  }
  var startDate = new Date(props.details.start_date);
  var endDate = new Date(props.details.end_date);
  console.log(startDate.toDateString().slice(4));
  console.log(endDate.toISOString());
  return (
    <View style={styles.cards}>
      <Text style={styles.name}>{name}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text>
          Start Date: {startDate.toDateString().slice(4)}
          {/* {startDate.getUTCDate()}/{startDate.getUTCMonth()}/
          {startDate.getFullYear()} */}
        </Text>
        <Text>Expiry Date: {endDate.toDateString().slice(4)}</Text>
      </View>
      {props.details.status !== "active" && (
        <Text style={{ fontSize: 18, color: "red" }}>
          Status :
          {props.details.status.charAt(0).toUpperCase() +
            props.details.status.slice(1)}
        </Text>
      )}
      {props.details.status === "active" && (
        <Text style={{ fontSize: 18, color: "green" }}>
          Status :
          {props.details.status.charAt(0).toUpperCase() +
            props.details.status.slice(1)}
        </Text>
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

import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../components/contexts";

export default function CourseCard(props) {
  const { authContext, loginState } = React.useContext(AuthContext);
  if (loginState.userName !== null) {
    if (loginState.userName.status === "active") {
      props.element.price = "0";
    }
  }
  let details = props.element;
  if (props.element.images.length > 0) {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Course", { details });
        }}
        style={styles.card}
      >
        {/* {props.element.images[0].src.length > 0 && ( */}
        <View style={{ height: 200 }}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: props.element.images[0].src }}
          />
        </View>
        {/* )} */}
        <Text style={styles.title}>{props.element.name}</Text>
        <View>
          <Text style={styles.price}>Rs.{props.element.price}</Text>
          {loginState.userName !== null &&
            loginState.userName.status === "active" && (
              <Text style={[styles.price, { color: "red" }]}>
                Members Discount
              </Text>
            )}
        </View>
      </TouchableOpacity>
    );
  } else {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  card: {
    width: "50%",
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  price: { fontSize: 16, textAlign: "center" },

  image: { width: "100%", height: "100%" },
});

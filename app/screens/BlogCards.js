import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function BlogCard(props) {
  let details = props.element;
  const link = props.element.guid.rendered;
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Blog Page", { link });
      }}
      style={styles.card}
    >
      <View style={{ height: 200 }}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri:
              "https://learnercircle.in/wp-content/uploads/2020/08/set-origami-paper-art-paintbrush-watercolor-straw-orange-backdrop_23-2148188415.jpg",
          }}
        />
      </View>
      <Text style={styles.title}>{props.element.title.rendered}</Text>
    </TouchableOpacity>
  );
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

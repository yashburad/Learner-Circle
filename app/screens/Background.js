import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";

export default function Background(props) {
  return (
    <Image
      blurRadius={1}
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height * 0.5,
      }}
      resizeMode="cover"
      source={{ uri: props.image.value }}
    />
  );
}

const styles = StyleSheet.create({});

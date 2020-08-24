import { WebView } from "react-native-webview";

import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function Schedule(props) {
  return (
    <WebView
      bounces={true}
      scalesPageToFit={false}
      source={{
        uri: "https://learnercircle.in/courses-schedule",
      }}
    />
  );
}

const styles = StyleSheet.create({});

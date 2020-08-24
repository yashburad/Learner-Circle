import { WebView } from "react-native-webview";

import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function TermsConditions(props) {
  return (
    <WebView
      bounces={true}
      scalesPageToFit={false}
      source={{
        uri: "https://learnercircle.in/terms-and-conditions",
      }}
    />
  );
}

const styles = StyleSheet.create({});
